const algoliasearch = require('algoliasearch')
const gql = require('graphql-tag')
const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { setContext } = require('apollo-link-context')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

const sanityHttpLink = createHttpLink({
  uri: process.env.SANITY_GRAPHQL_ENDPOINT,
  fetch
})

const sanityAuthLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  }
})

const sanityApolloClient = new ApolloClient({
  link: sanityAuthLink.concat(sanityHttpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
})

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
)

const index = algolia.initIndex('sanity_index')

const allDocumentsQuery = gql`
  query {
    allArtist(where: { category: { neq: "projectArtist" } }) {
      id: _id
      type: _type
      firstName
      lastName
      slug {
        current
      }
      category
      hide
      featuredImage {
        asset {
          id: _id
        }
      }
    }
    allArtwork {
      id: _id
      type: _type
      title
      year
      tags {
        label
        value
      }
      hide
      slug {
        current
      }
      artist {
        firstName
        lastName
        category
        slug {
          current
        }
      }
      images {
        alt
        asset {
          id: _id
        }
      }
    }
    allExhibition {
      id: _id
      type: _type
      name
      location {
        name
      }
      heroVideo {
        videoThumbnail {
          alt
          asset {
            id: _id
          }
        }
      }
      openingDate
      closingDate
      hide
      slug {
        current
      }
      heroImage {
        alt
        asset {
          id: _id
        }
      }
    }
    allNewsArticle {
      id: _id
      type: _type
      title
      slug {
        current
      }
      heroImage {
        alt
        asset {
          id: _id
        }
      }
    }
  }
`

const handler = async () => {
  try {
    const sanity = await sanityApolloClient.query({
      query: allDocumentsQuery
    })

    const artists = sanity.data.allArtist
    const artworks = sanity.data.allArtwork
    const exhibitions = sanity.data.allExhibition
    const articles = sanity.data.allNewsArticle

    const records = []

    for (const artist of artists) {
      artist.objectID = artist.id
      records.push(artist)
    }
    for (const artwork of artworks) {
      artwork.objectID = artwork.id
      records.push(artwork)
    }
    for (const exhibition of exhibitions) {
      exhibition.objectID = exhibition.id
      records.push(exhibition)
    }
    for (const article of articles) {
      article.objectID = article.id
      records.push(article)
    }

    await index.clearObjects()
    await index.saveObjects(records)

    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*'
      },
      body: 'All documents successfully added to Algolia'
    }
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message })
    }
  }
}

exports.handler = handler
