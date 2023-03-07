# artlife-nuxt

## Build Setup

```bash
$ yarn install

$ yarn dev

$ yarn build
$ yarn start

$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Preview Site

A link to preview changes in Sanity on the site before deploying them to the live site can be found here [Heroku Preview](https://artlife-sanity-preview.herokuapp.com/)

## Sanity Studio

For detailed documentation, visit [Sanity docs](https://www.sanity.io/docs)

This project is using the Vue Apollo plugin to query Sanity's GraphQL API, docs can be found at [Vue Apollo docs](https://apollo.vuejs.org/api/)
Queries are located in the `/

```bash
# run sanity studio locally
$ cd sanity
$ yarn start

# deploy changes
$ cd sanity
$ sanity deploy
```

**IMPORTANT - DEPLOYING GRAPHQL**

Any time updates are made to Sanity schemas, the updates must be deployed to the GraphQL API and the `schema.json` file that's being passed into the Apollo config for Nuxt needs to be updated as well. The command and query to do both are below:

```
# deploy schema changes to GraphQL API
$ cd sanity
$ sanity graphql deploy
```

The query to return the schema in Sanity's GraphQL Playground is below. Run the query and copy and paste the results into the `schema.json` file in the apollo folder, removing the extra `data` object that’s nesting the results.

```
query {
  __schema {
    types {
      name
      kind
      possibleTypes {
        name
        description
      }
    }
  }
}
```
