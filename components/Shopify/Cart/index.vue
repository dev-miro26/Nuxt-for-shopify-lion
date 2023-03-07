<template>
  <div>
    <div class="sub-nav-item cart-icon" @click="toggleIsExpanded">
      <div v-if="itemCount" class="cart-full">
        <img src="~/assets/svg/icon_cart_full.svg" />
        <span>{{ itemCount }}</span>
      </div>
      <img v-else src="~/assets/svg/icon_cart_empty.svg" class="cart-empty" />
    </div>
    <transition name="fade">
      <div v-if="isExpanded" :class="['cart-dropdown']">
        <div class="cart-line-items-container hide-scrollbar">
          <div v-if="isEmpty" class="text-md center no-items">
            There are no items in your cart
          </div>
          <CartLineItem
            v-for="(item, ix) in cartItems"
            v-else
            :key="ix"
            :item="item"
          />
        </div>
        <div class="cart-subtotal-container">
          <div class="cart-subtotal-text">
            <span>{{ cartTotal }}</span>
            <span class="cart-subtotal-shipping">
              *Shipping and Taxes calculated at checkout
            </span>
          </div>
          <a
            v-if="itemCount"
            :href="checkoutUrl"
            target="_blank"
            class="button"
          >
            <p>Checkout</p>
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import shopify from '@/lib/mixins/shopify'
import { mapGetters } from 'vuex'

export default {
  mixins: [shopify],
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    ...mapGetters({
      cartItems: 'shop/getCartItems',
      cartSubTotal: 'shop/getCartSubTotal',
      checkoutUrl: 'shop/getCheckoutUrl'
    }),
    cartTotal() {
      return this.cartSubTotal ? `Subtotal ${this.cartSubTotal}` : `Subtotal $0`
    },
    isEmpty() {
      return this.itemCount === 0
    },
    itemCount() {
      return this.cartItems?.length
    }
  },
  methods: {
    toggleIsExpanded() {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss">
.cart-icon {
  cursor: pointer;

  .cart-full {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    gap: css-pixels(20px);
    @include breakpoint('laptop') {
      gap: css-pixels(40px);
    }
  }

  img {
    width: css-pixels(40px);
    height: 100%;
    @include breakpoint('tablet') {
      width: 20px;
    }
  }
}

.cart-dropdown {
  position: absolute;
  top: $sub-nav-height-mobile;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: $white-smoke;
  width: 100%;
  height: 50vh;
  padding: 0px css-pixels(40px) css-pixels(40px);
  @include breakpoint('mobile') {
    width: 420px;
  }
  @include breakpoint('tablet') {
    top: $sub-nav-height;
    padding: 0px 20px 20px;
  }

  .cart-line-items-container {
    flex: 1;
    overflow: auto;

    .no-items {
      display: grid;
      place-items: center;
      height: 100%;
    }

    & > :not(:first-child) {
      border-top: 1px solid $black;
    }
  }

  .cart-subtotal-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $black;
    padding-top: css-pixels(40px);
    @include breakpoint('tablet') {
      padding-top: 20px;
    }

    .cart-subtotal-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
    }

    .cart-subtotal-shipping {
      font-size: 12px;
    }
  }
}
</style>
