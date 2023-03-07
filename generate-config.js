require('dotenv').config()
const gql = require('graphql-tag')
const { ApolloClient } = require('apollo-client')
const { createHttpLink } = require('apollo-link-http')
const { setContext } = require('apollo-link-context')
const { InMemoryCache } = require('apollo-cache-inmemory')
const fetch = require('node-fetch')

//sanity config
export const sanityGenerate = gql`
  query {
    allArtist {
      slug {
        current
      }
      category
    }
    allArtwork {
      slug {
        current
      }
      artist {
        category
        slug {
          current
        }
      }
    }
    allLocation {
      slug {
        current
      }
      isActive
      type
    }
    allExhibition {
      slug {
        current
      }
      type
    }
    allSeries {
      slug {
        current
      }
    }
    allTextPage {
      slug {
        current
      }
    }
  }
`
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

export const sanityApolloClient = new ApolloClient({
  link: sanityAuthLink.concat(sanityHttpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
})

//shopify config
export const shopifyGenerate = gql`
  query {
    products(first: 50) {
      edges {
        node {
          handle
          collections(first: 1) {
            edges {
              node {
                handle
              }
            }
          }
        }
        cursor
      }
    }
    collections(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`
const shopifyHttpLink = createHttpLink({
  uri: process.env.SHOPIFY_STOREFRONT_ENDPOINT,
  fetch
})

const shopifyAuthLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    })
  }
})

export const shopifyApolloClient = new ApolloClient({
  link: shopifyAuthLink.concat(shopifyHttpLink),
  cache: new InMemoryCache({
    addTypename: false
  })
})
