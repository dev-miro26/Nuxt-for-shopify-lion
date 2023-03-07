<template>
  <div>
    <div v-if="!$fetchState.pending">
      <div id="sub-nav-container">
        <SubNav>
          <SubNavLink v-for="(item, ix) in shopNav" :key="ix" :path="item.link">
            {{ item.label }}
          </SubNavLink>
          <Cart />
        </SubNav>
      </div>
      <main>
        <div class="page-container-thin shop-container">
          <h1 v-if="!hasProducts" class="text-lg center">coming soon</h1>
          <div
            v-else
            class="collection-grid shop-collection mobile-two-up tight"
          >
            <GridProductCard
              v-for="(product, ix) in products"
              :key="ix"
              :product="product"
              :collection-handle="handle"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapGetters } from 'vuex'
import collectionByHandle from '@/apollo/queries/shopify/collectionByHandle'
import collectionBySlug from '@/apollo/queries/sanity/collectionBySlug'
import selectPublishedOrDraft from '@/lib/helpers/selectPublishedOrDraft'
import helpers from '@/lib/mixins/helpers'
import meta from '@/lib/mixins/meta'

export default {
  mixins: [helpers, meta],
  data() {
    return {
      collection: null,
      products: []
    }
  },
  async fetch() {
    const { app, error, params, store } = this.$nuxt.context
    const client = app.apolloProvider.defaultClient
    const shopifyClient = app.apolloProvider.clients.shopify

    // Sanity collection query
    const sanityResponse = await client.query({
      query: collectionBySlug,
      variables: { slug: params.collection }
    })

    if (sanityResponse.data.collection) {
      this.collection = selectPublishedOrDraft(sanityResponse.data.collection)
    }

    // Shopify collection query
    const shopifyResponse = await shopifyClient.query({
      query: collectionByHandle,
      variables: { handle: params.collection }
    })
    const collection = get(shopifyResponse, 'data.collection', null)
    const products = get(shopifyResponse, 'data.collection.products.edges', [])

    if (!collection) {
      error({ statusCode: 404 })
    } else {
      this.products = products.map(product => product.node)
    }
  },
  computed: {
    ...mapGetters({
      shopNav: 'subnav/getShopNav'
    }),
    handle() {
      return this.collection?.handle
    },
    hasProducts() {
      return this.products?.length
    },
    metaTitleFallback() {
      return 'Shop'
    }
  }
}
</script>

<style lang="scss"></style>
