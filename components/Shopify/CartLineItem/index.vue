<template>
  <div class="cart-line-item">
    <div class="cart-line-item-details">
      <p>{{ title }}</p>
      <p>{{ formattedPrice }}</p>
      <div>
        <p>{{ quantity }}</p>
        <div class="cart-line-item-group quantity-buttons">
          <button
            :disabled="plusIsDisabled"
            class="cart-line-item-button"
            @click="increaseQuantity(variantId)"
          >
            <img src="~/assets/svg/icon_plus.svg" />
          </button>
          <button
            :disabled="minusIsDisabled"
            class="cart-line-item-button"
            @click="decreaseQuantity(variantId)"
          >
            <img src="~/assets/svg/icon_minus.svg" />
          </button>
        </div>
      </div>
      <div>
        <button
          class="cart-line-item-button cart-line-item-group"
          @click="removeItem(variantId)"
        >
          <img src="~/assets/svg/icon_trash.svg" />
          <span>Remove</span>
        </button>
      </div>
    </div>
    <div class="product-image-crop">
      <ShopifyImage :image="image" />
    </div>
  </div>
</template>

<script>
import shopify from '@/lib/mixins/shopify'
import _isEmpty from 'lodash/isEmpty'

export default {
  mixins: [shopify],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cartIsEmpty() {
      return _isEmpty(this.item)
    },
    currentInventoryQuantity() {
      return this.variantInventory
        ? this.variantInventory.currentQuantity
        : null
    },
    formattedPrice() {
      return this.formatPrice(this.variant?.priceV2.amount)
    },
    image() {
      return this.variant?.image
    },
    minusIsDisabled() {
      return this.currentInventoryQuantity <= 1
    },
    plusIsDisabled() {
      return this.currentInventoryQuantity === 0
    },
    quantity() {
      return `Quantity: ${this.item?.quantity}x`
    },
    title() {
      return this.variant?.product?.title
    },
    variant() {
      return this.item?.variant
    },
    variantId() {
      return this.variant?.id
    }
  },
  methods: {
    decreaseQuantity(variantId) {
      this.$store.dispatch('shop/decreaseQuantity', {
        variantId,
        quantity: 1
      })
    },
    increaseQuantity(variantId) {
      this.$store.dispatch('shop/increaseQuantity', {
        variantId,
        quantity: 1
      })
    },
    removeItem(variantId) {
      this.$store.dispatch('shop/removeFromCart', variantId)
    }
  }
}
</script>

<style lang="scss">
.cart-line-item {
  display: grid;
  grid-template-columns: auto css-pixels(386px);
  gap: css-pixels(120px);
  padding: css-pixels(40px) 0px;
  @include breakpoint('tablet') {
    grid-template-columns: auto 150px;
    gap: 68px;
    padding: 20px 0px;
  }

  .cart-line-item-details {
    display: grid;
    gap: css-pixels(60px);
    @include breakpoint('tablet') {
      gap: 40px;
    }
  }

  .cart-line-item-button {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0px;
    img {
      width: 16px;
    }
    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  .cart-line-item-group {
    display: inline-grid;
    grid-auto-flow: column;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    line-height: 1;
  }

  .quantity-buttons {
    margin-top: 8px;
  }
}
</style>
