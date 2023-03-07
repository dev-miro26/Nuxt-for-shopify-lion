/*
reference https://github.com/sanity-io/sanity-algolia for all options
*/
import algoliasearch from "algoliasearch";
import sanityClient, { SanityDocumentStub } from "@sanity/client";
import indexer from "sanity-algolia";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
);
const sanity = sanityClient({
  projectId: "fvhcpakg",
  dataset: process.env.SANITY_WEBHOOK_DATASET!,
  apiVersion: "2021-03-25",
  useCdn: false
});

const handler = (event: any) => {
  console.log(event)
  if (event.headers["content-type"] !== "application/json") {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "Bad request" })
    }
  }

  const algoliaIndex = algolia.initIndex("sanity_index");

  const sanityAlgolia = indexer(
    {
      artist: {
        index: algoliaIndex,
        projection: `{
          firstName,
          lastName,
          slug {
            current
          },
          category,
          hide,
          featuredImage {
            asset->{
              "id": _id,
            }
          }
        }`
      },
      artwork: {
        index: algoliaIndex,
        projection: `{
          title,
          tags,
          year,
          hide,
          slug {
            current
          },
          artist->{
            firstName,
            lastName,
            category,
            slug {
              current
            }
          },
          images,
        }`
      },
      exhibition: {
        index: algoliaIndex,
        projection: `{
          name,
          openingDate,
          closingDate,
          location->{
            name
					},
          hide,
          slug {
            current
          },
          heroImage {
            alt,
            asset->{
              "id": _id,
            }
          },
          heroVideo {
            videoThumbnail {
              alt,
              asset->{
                "id": _id,
              }
            }
          },
        }`
      },
      series: {
        index: algoliaIndex,
        projection: `{
          name,
          slug {
            current
          },
          heroImage {
            alt,
            asset->{
              "id": _id
            }
          },
          heroVideo {
            videoThumbnail {
              alt,
              asset->{
                "id": _id,
              }
            }
          },
        }`
      }
    },
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case "artist":
          return {
            firstName: document.firstName,
            lastName: document.lastName,
            slug: document.slug,
            category: document.category,
            hide: document.hide,
            featuredImage: document.featuredImage
          };
        case "artwork":
          return {
            title: document.title,
            tags: document.tags,
            year: document.year,
            hide: document.hide,
            slug: document.slug,
            artist: document.artist,
            images: document.images
          };
        case "exhibition":
          return {
            name: document.name,
            openingDate: document.openingDate,
            closingDate: document.closingDate,
            hide: document.hide,
            slug: document.slug,
            heroImage: document.heroImage,
            heroVideo: document.heroVideo,
            location: document.location
          };
        case "series":
          return {
            name: document.name,
            slug: document.slug,
            heroImage: document.heroImage,
            heroVideo: document.heroVideo
          };
        default:
          return document;
      }
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, JSON.parse(event.body))
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({ msg: "ok" })
      };
    });
};

exports.handler = handler;
