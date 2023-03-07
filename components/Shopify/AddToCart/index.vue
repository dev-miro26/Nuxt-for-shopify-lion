<template>
  <div>
    <button :class="buttonClass" :disabled="isDisabled" @click="updateCart()">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import shopify from '@/lib/mixins/shopify'
import { mapGetters } from 'vuex'

export default {
  mixins: [shopify],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isProductPage: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => {}
    },
    productInventory: {
      type: Array,
      default: () => []
    },
    selectedQuantity: {
      type: Number,
      default: 1
    },
    variantId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      getVariantInventoryById: 'shop/getVariantInventoryById'
    }),
    buttonClass() {
      return this.isAvailable ? 'button' : 'sold-out'
    },
    buttonText() {
      return this.isAvailable ? 'Add to cart' : 'Sold out'
    },
    isAvailable() {
      return this.variantQuantity > 0 || this.disabled
    },
    isDisabled() {
      return this.disabled || !this.isAvailable
    },
    variantInCart() {
      return this.getVariantInventoryById(this.variantId)
    }
  },
  methods: {
    async updateCart() {
      this.loading = true
      try {
        await this.$store.dispatch('shop/addToCart', {
          variantId: this.variantId,
          quantity: this.selectedQuantity
        })
      } catch (e) {
        console.log(e)
      }
      if (this.variantInCart) {
        this.$store.commit('shop/decreaseVariantInventory', {
          variantId: this.variantId,
          quantity: this.selectedQuantity
        })
      } else {
        const newQuantity = this.quantityAvailable - 1
        this.$store.commit('shop/setVariantInventory', {
          variantId: this.variantId,
          initialQuantity: this.quantityAvailable,
          currentQuantity: newQuantity
        })
      }
      this.loading = false
    }
  }
}
</script>
