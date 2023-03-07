// import {
//   sanityApolloClient,
//   sanityGenerate,
//   shopifyApolloClient,
//   shopifyGenerate
// } from './generate-config'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: process.env.NUXT_SERVER == 't' ? 'server' : 'static',
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_SITE_KEY // for example
    }
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ArtLife',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/tidio.js', mode: 'client' },
    { src: '@/plugins/carousel.js', ssr: false },
    { src: '@/plugins/vue-js-modal.js', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Environment variables for client side
  env: {
    SANITY_GRAPHQL_ENDPOINT: process.env.SANITY_GRAPHQL_ENDPOINT,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN, // prettier-ignore
    SHOPIFY_STOREFRONT_ENDPOINT: process.env.SHOPIFY_STOREFRONT_ENDPOINT,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    'nuxt-lazysizes',
    '@nuxt/typescript-build'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_functions.scss',
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_variables.scss'
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/recaptcha',
    '@nuxtjs/gtm',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: `${process.env.SITE_URL}sitemap.xml`
  },

  sitemap: {
    hostname: `${process.env.SITE_URL}`,
    gzip: true
  },

  apollo: {
    clientConfigs: {
      default: '~/apollo/clients/default.js',
      shopify: '~/apollo/clients/shopify.js'
    },
    includeNodeModules: true
  },
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // serverMiddleware: [{ path: '/api', handler: '~/middleware-server/vercel' }],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vue-instantsearch', 'vue-carousel', 'instantsearch.js/es']
  },

  gtm: {
    id: process.env.GOOGLE_TAG_MANAGER_ID
  },

  recaptcha: {
    hideBadge: false,
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    size: 'normal',
    version: 2
  },

  generate: {
    fallback: true
    // routes() {
    //   const sanity = sanityApolloClient
    //     .query({
    //       query: sanityGenerate
    //     })
    //     .then(response => {
    //       const artists = response.data.allArtist
    //       const artworks = response.data.allArtwork
    //       const locations = response.data.allLocation
    //       const exhibitions = response.data.allExhibition
    //       const series = response.data.allSeries
    //       const textPages = response.data.allTextPage

    //       const artistRoutes = []
    //       const artworkRoutes = []
    //       const locationRoutes = []
    //       const exhibitionRoutes = []
    //       const seriesRoutes = []
    //       const textPageRoutes = []

    //       for (const a of artists) {
    //         if (a.slug && a.category && a.category !== 'projectArtist') {
    //           const route = `/${a.category}s/${a.slug.current}`
    //           artistRoutes.push(route)
    //         }
    //       }
    //       for (const a of artworks) {
    //         if (a.slug) {
    //           let route
    //           if (a.artist) {
    //             if (a.artist.category !== 'projectArtist') {
    //               route = `/${a.artist.category}s/${a.artist.slug.current}/artworks/${a.slug.current}`
    //               artworkRoutes.push(route)
    //             } else if (
    //               a.artist.slug &&
    //               a.artist.category === 'projectArtist'
    //             ) {
    //               route = `/${a.artist.slug.current}/artworks/${a.slug.current}`
    //               artworkRoutes.push(route)
    //             }
    //           }
    //         }
    //       }
    //       for (const l of locations) {
    //         if (l.slug && l.type === 'internal' && l.isActive) {
    //           const route = `/about/locations/${l.slug.current}`
    //           locationRoutes.push(route)
    //         }
    //       }
    //       for (const e of exhibitions) {
    //         if (e.slug && e.type !== 'upcoming') {
    //         }
    //       }
    //       for (const s of series) {
    //         if (s.slug) {
    //           const route = `/series/${s.slug.current}`
    //           seriesRoutes.push(route)
    //         }
    //       }
    //       for (const t of textPages) {
    //         if (t.slug) {
    //           const route = `/${t.slug.current}`
    //           textPageRoutes.push(route)
    //         }
    //       }

    //       return Promise.all([
    //         ...artistRoutes,
    //         ...artworkRoutes,
    //         ...exhibitionRoutes,
    //         ...locationRoutes,
    //         ...seriesRoutes,
    //         ...textPageRoutes
    //       ]).then(values => {
    //         return values.join().split(',')
    //       })
    //     })

    //   const shopify = shopifyApolloClient
    //     .query({ query: shopifyGenerate })
    //     .then(response => {
    //       const collections = response.data.collections.edges
    //       const products = response.data.products.edges

    //       const collectionRoutes = []
    //       const productRoutes = []

    //       for (const c of collections) {
    //         const route = `/shop/${c.node.handle}`
    //         collectionRoutes.push(route)
    //       }
    //       for (const p of products) {
    //         if (p.node.collections.edges[0]) {
    //           const route = `/shop/products/${p.node.handle}`
    //           productRoutes.push(route)
    //         }
    //       }

    //       return Promise.all([...collectionRoutes, ...productRoutes]).then(
    //         values => {
    //           return values.join().split(',')
    //         }
    //       )
    //     })

    //   return Promise.all([shopify, sanity]).then(values => {
    //     return values.join().split(',')
    //   })
    // }
  }
}
