import _get from 'lodash/get'

export const formatPrice = amount => {
  return amount
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: Math.trunc(Math.abs(amount)).toFixed().length
      }).format(amount)
    : ''
}

export const stripLineItems = items => {
  return _get(items, 'edges', []).map(item => item.node)
}

export const simplifyLineItems = items => {
  return items.map(obj => {
    return {
      variantId: obj.variantId || obj.variant.id,
      quantity: obj.quantity
    }
  })
}
