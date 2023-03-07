import Vue from 'vue'
import _cloneDeep from 'lodash/cloneDeep'
import _findIndex from 'lodash/findIndex'
import _get from 'lodash/get'
import _sumBy from 'lodash/sumBy'

import {
  CheckoutCreate,
  ReplaceCheckout
} from '@/apollo/mutations/shopify/checkout.gql'
import { CheckoutById } from '@/apollo/queries/shopify/checkoutById.gql'

import {
  stripLineItems,
  simplifyLineItems,
  formatPrice
} from '@/utils/shopify.js'

export const state = () => ({
  loading: 0,
  checkout: {
    id: '',
    webUrl: '',
    completedAt: null
  },
  cart: {
    count: 0,
    subTotal: {},
    lineItems: []
  },
  inventory: [],
  expire: 24 * 1
})

export const mutations = {
  setCheckout(state, checkout = {}) {
    state.checkout = checkout
    const lineItems = stripLineItems(checkout.lineItems)
    const totalQuantity = _sumBy(lineItems, 'quantity')
    Vue.set(state.cart, 'subTotal', checkout.subtotalPriceV2)
    Vue.set(state.cart, 'lineItems', lineItems)
    Vue.set(state.cart, 'count', totalQuantity)
  },
  startLoading(state) {
    state.loading += 1
  },
  finishLoading(state) {
    if (state.loading > 0) {
      state.loading -= 1
    }
  },
  clearCheckout(state) {
    state.loading = 0

    Vue.set(state, 'checkout', {
      id: '',
      webUrl: '',
      completedAt: null
    })

    Vue.set(state, 'cart', {
      count: 0,
      subTotal: {},
      lineItems: []
    })
  },
  setNavigation(state, navigation) {
    state.navigation = navigation
  },
  setVariantInventory(state, variant) {
    state.inventory.push(variant)
  },
  decreaseVariantInventory(state, { variantId, quantity }) {
    const currentVariantIndex = _findIndex(state.inventory, obj => {
      return obj.variantId === variantId
    })
    state.inventory[currentVariantIndex].currentQuantity -= quantity
  },
  increaseVariantInventory(state, { variantId, quantity }) {
    const currentVariantIndex = _findIndex(state.inventory, obj => {
      return obj.variantId === variantId
    })
    state.inventory[currentVariantIndex].currentQuantity += quantity
  },
  resetVariantInventory(state, variantId) {
    const currentVariantIndex = _findIndex(state.inventory, obj => {
      return obj.variantId === variantId
    })
    const initialQuantity = state.inventory[currentVariantIndex].initialQuantity
    state.inventory[currentVariantIndex].currentQuantity = initialQuantity
  },
  resetAllInventory(state) {
    state.inventory.forEach(variant => {
      variant.currentQuantity = variant.initialQuanitty
    })
  }
}

export const actions = {
  // Add item to cart, create new checkout if one does not exist
  async addToCart({ state, commit, dispatch }, { variantId, quantity }) {
    commit('startLoading')

    if (!state.checkout.id) {
      await dispatch('createCheckout', { variantId, quantity })
    } else {
      // Note Shopify API doesn't allow updating a checkout, only replacing all lineItems.
      const lineItems = _cloneDeep(state.cart.lineItems)
      const currentVariantIndex = _findIndex(lineItems, obj => {
        return obj.variant.id === variantId
      })

      if (currentVariantIndex !== -1) {
        lineItems[currentVariantIndex].quantity += quantity
      } else {
        lineItems.push({
          variant: { id: variantId },
          quantity: quantity
        })
      }

      await dispatch('replaceCheckout', lineItems)
    }

    commit('finishLoading')
  },
  // Create checkout in Shopify, store results as checkout and cart
  async createCheckout({ commit }, { variantId, quantity }) {
    commit('startLoading')
    const client = this.app.apolloProvider.clients.shopify

    const checkout = await client.mutate({
      mutation: CheckoutCreate,
      variables: {
        variantId: variantId,
        quantity: quantity
      }
    })

    commit('setCheckout', _get(checkout, 'data.checkoutCreate.checkout', {}))

    commit('finishLoading')
  },
  async removeFromCart({ state, commit, dispatch }, variantId) {
    commit('startLoading')

    const lineItems = state.cart.lineItems.filter(
      item => item.variant.id !== variantId
    )

    await dispatch('replaceCheckout', lineItems)

    commit('resetVariantInventory', variantId)

    commit('finishLoading')
  },
  async replaceCheckout({ state, commit }, lineItems = []) {
    commit('startLoading')

    const client = this.app.apolloProvider.clients.shopify
    lineItems = simplifyLineItems(lineItems)
    lineItems = lineItems.filter(obj => obj.quantity > 0)

    const checkout = await client.mutate({
      mutation: ReplaceCheckout,
      variables: {
        checkoutId: state.checkout.id,
        lineItems: lineItems
      }
    })

    commit(
      'setCheckout',
      _get(checkout, 'data.checkoutLineItemsReplace.checkout', {})
    )

    commit('finishLoading')
  },
  async getCheckout({ state, commit }) {
    commit('startLoading')
    const client = this.app.apolloProvider.clients.shopify

    if (state.checkout.completedAt) {
      commit('clearCheckout')
    } else if (state.checkout.id) {
      const response = await client.query({
        query: CheckoutById,
        variables: {
          checkoutId: state.checkout.id
        }
      })

      const checkout = _get(response, 'data.node', {})

      if (checkout.completedAt) {
        commit('clearCheckout')
      } else {
        commit('setCheckout', checkout)
      }
    } else {
      commit('clearCheckout')
    }

    commit('finishLoading')
  },
  async increaseQuantity({ state, commit, dispatch }, { variantId, quantity }) {
    commit('startLoading')

    const lineItems = _cloneDeep(state.cart.lineItems)
    const currentVariantIndex = _findIndex(lineItems, obj => {
      return obj.variant.id === variantId
    })
    lineItems[currentVariantIndex].quantity += quantity

    await dispatch('replaceCheckout', lineItems)

    commit('decreaseVariantInventory', {
      variantId,
      quantity
    })

    commit('finishLoading')
  },
  async decreaseQuantity({ state, commit, dispatch }, { variantId, quantity }) {
    commit('startLoading')

    const lineItems = _cloneDeep(state.cart.lineItems)
    const currentVariantIndex = _findIndex(lineItems, obj => {
      return obj.variant.id === variantId
    })
    lineItems[currentVariantIndex].quantity -= quantity

    await dispatch('replaceCheckout', lineItems)

    commit('increaseVariantInventory', {
      variantId,
      quantity
    })

    commit('finishLoading')
  }
}

export const getters = {
  getCartItems: state => state.cart.lineItems,
  getCartSubTotal: state => formatPrice(state.cart.subTotal.amount),
  getCheckoutUrl: state => state.checkout.webUrl,
  getVariantInventoryById: state => variantId => {
    return state.inventory.find(variant => variant.variantId === variantId)
  }
}
