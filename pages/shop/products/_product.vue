<template>
  <div>
    <div v-if="!$fetchState.pending && product" id="product-detail">
      <div id="sub-nav-container">
        <SubNav>
          <SubNavLink v-for="(item, ix) in shopNav" :key="ix" :path="item.link">
            {{ item.label }}
          </SubNavLink>
          <Cart />
        </SubNav>
      </div>
      <main class="detail-page flow-grid">
        <div v-if="featuredImage" class="half-width-container">
          <ShopifyImage :image="featuredImage" class="half-width" />
        </div>
        <div class="half-width-container">
          <h1 class="text-lg half-width">{{ title }}</h1>
        </div>
        <div v-if="description" class="half-width-container">
          <div class="half-width" v-html="description" />
        </div>
        <div v-if="longDescription" class="half-width-container">
          <div class="half-width" v-html="longDescription" />
        </div>
        <div v-if="images.length" class="full-width-container flow-grid">
          <ShopifyImage
            v-for="(image, ix) in images"
            :key="ix"
            :image="image"
            class="full-width"
          />
        </div>
      </main>
      <Hover>
        <span class="price">{{ productPrice }}</span>
        <VariantSelect
          v-if="hasVariantOptions"
          v-model="value"
          :variants="variants"
        />
        <AddToCart
          v-if="productInventory"
          :disabled="isDisabled"
          is-product-page
          :product="product"
          :product-inventory="productInventory"
          :selected-quantity="selectedQuantity"
          :variant-id="selectedVariantId"
        />
      </Hover>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapGetters } from 'vuex'
import productByHandle from '~/apollo/queries/shopify/productByHandle'
import inventoryByProductHandle from '~/apollo/queries/shopify/inventoryByProductHandle'
import meta from '@/lib/mixins/meta'
import shopify from '@/lib/mixins/shopify'

export default {
  mixins: [meta, shopify],
  data() {
    return {
      product: null,
      productInventory: null,
      selectedQuantity: 1,
      value: ''
    }
  },
  async fetch() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.clients.shopify
    const { data } = await client.query({
      query: productByHandle,
      variables: { handle: params.product }
    })

    if (data.product) {
      this.product = data.product
    } else {
      error({ statusCode: 404 })
    }
  },
  computed: {
    ...mapGetters({
      shopNav: 'subnav/getShopNav'
    }),
    description() {
      return this.product?.descriptionHtml
    },
    featuredImage() {
      return this.productImages?.length ? this.productImages[0] : null
    },
    images() {
      return this.productImages.slice(1)
    },
    longDescription() {
      return get(this.product, 'metafields.edges[0].node.value', '').slice(2, -2) // prettier-ignore
    },
    metaTitleFallback() {
      return 'Shop'
    },
    productImages() {
      return get(this.product, 'images.edges', []).map(edge => edge.node)
    },
    selectedVariantId() {
      return this.hasVariantOptions
        ? this.value
        : this.variants
        ? this.variants[0].id
        : null
    }
  },
  async mounted() {
    const { app, error, params } = this.$nuxt.context
    const client = app.apolloProvider.clients.shopify
    const { data } = await client.query({
      query: inventoryByProductHandle,
      variables: { handle: params.product }
    })

    if (data.product) {
      this.productInventory = data.product.variants.edges.map(edge => edge.node)
    } else {
      error({ statusCode: 404 })
    }
  }
}
</script>

<style lang="scss">
#product-detail {
  .flow-grid {
    grid-gap: 20px;
  }
  .hover-container {
    align-items: center;
    button,
    .price {
      font-size: 20px;
    }
  }
}
</style>
