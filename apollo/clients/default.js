import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import schema from '@/apollo/schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

export default () => ({
  httpEndpoint: process.env.SANITY_GRAPHQL_ENDPOINT,
  httpLinkOptions: process.env.SANITY_PREVIEW_TOKEN
    ? {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_PREVIEW_TOKEN}`
        }
      }
    : {},
  cache: new InMemoryCache({ fragmentMatcher })
})
