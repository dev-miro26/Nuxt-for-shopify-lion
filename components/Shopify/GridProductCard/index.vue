<template>
  <div class="grid-product-card collection-grid-item">
    <nuxt-link :to="productPath">
      <ShopifyImage :image="image" />
    </nuxt-link>
    <div class="product-card-details">
      <p class="product-card-title text-md">{{ title }}</p>
      <p class="product-card-price text-sm">{{ productPrice }}</p>
      <div class="product-card-buttons">
        <VariantSelect
          v-if="hasVariantOptions"
          v-model="value"
          :variants="variants"
        />
        <AddToCart
          v-if="productInventory"
          :disabled="isDisabled"
          :product="product"
          :product-inventory="productInventory"
          :selected-quantity="selectedQuantity"
          :variant-id="selectedVariantId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import shopify from '@/lib/mixins/shopify'
import inventoryByProductHandle from '~/apollo/queries/shopify/inventoryByProductHandle'

export default {
  mixins: [shopify],
  props: {
    product: {
      type: Object,
      required: true
    },
    collectionHandle: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      selectedQuantity: 1,
      value: '',
      productInventory: null
    }
  },
  computed: {
    image() {
      return this.product.images.edges[0].node
    },
    productHandle() {
      return this.product?.handle
    },
    productPath() {
      return `/shop/products/${this.productHandle}`
    },
    selectedVariantId() {
      return this.hasVariantOptions ? this.value : this.variants[0].id
    }
  },
  async mounted() {
    const { app, error } = this.$nuxt.context
    const client = app.apolloProvider.clients.shopify
    const { data } = await client.query({
      query: inventoryByProductHandle,
      variables: { handle: this.product.handle }
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
.grid-product-card {
  .product-card-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: flex-start;
    padding-top: 10px;

    .product-card-title {
      font-size: 18px;
      line-height: 1.25;
      padding-bottom: 8px;
      text-align: center;
      @include breakpoint('mobile') {
        font-size: 24px;
      }
    }

    .product-card-price {
      padding-bottom: 20px;
    }

    .product-card-buttons {
      display: inline-grid;
      gap: css-pixels(40px);
      @include breakpoint('tablet') {
        grid-auto-flow: column;
        gap: 20px;
      }
    }
  }
}
</style>
