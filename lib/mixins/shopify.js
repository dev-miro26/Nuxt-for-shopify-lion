import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getVariantInventoryById: 'shop/getVariantInventoryById'
    }),
    cartInventory() {
      return this.$store.state.shop.inventory
    },
    formattedPrice() {
      return this.formatPrice(this.price)
    },
    formattedVariantPrice() {
      return this.formatPrice(this.value)
    },
    hasVariantOptions() {
      return this.variants?.length > 1
    },
    isDisabled() {
      return this.value?.length === 0 && this.hasVariantOptions
    },
    price() {
      return this.product?.priceRange.minVariantPrice.amount
    },
    productPrice() {
      return this.hasVariantOptions
        ? this.formattedVariantPrice
        : this.formattedPrice
    },
    quantityAvailable() {
      const selectedVariantInventory = this.productInventory.find(
        variant => variant.id === this.variantId
      )
      return selectedVariantInventory?.quantityAvailable
    },
    selectedVariant() {
      return this.hasVariantOptions
        ? this.variants.filter(variant => variant.id === this.selectedVariantId)
        : this.variants
        ? this.variants[0]
        : null
    },
    title() {
      return this.product?.title
    },
    variants() {
      return this.product?.variants.edges.map(edge => edge.node)
    },
    variantInventory() {
      return this.cartInventory.length
        ? this.getVariantInventoryById(this.variantId)
        : null
    },
    variantQuantity() {
      return this.variantInventory
        ? this.variantInventory.currentQuantity
        : this.quantityAvailable
        ? this.quantityAvailable
        : null
    }
  },
  methods: {
    formatPrice(amount) {
      return amount
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumSignificantDigits: Math.trunc(Math.abs(amount)).toFixed()
              .length
          }).format(amount)
        : ''
    }
  }
}
