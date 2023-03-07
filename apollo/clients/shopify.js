export default () => ({
  httpEndpoint: process.env.SHOPIFY_STOREFRONT_ENDPOINT,
  httpLinkOptions: {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  }
})
