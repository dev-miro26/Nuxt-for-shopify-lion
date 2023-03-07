export const state = () => ({
  acuityEnabled: false,
  footer: {},
  meta: {
    // VV needs to be replaced
    // description:
    //   'Salon 94 is an art gallery in NYC featuring renowned artists and selected works of fine art. Visit one of their four art galleries and exhibits in New York City today.',
    // image: '/og_image_fallback.jpg'
    // title: 'Art Gallery & Exhibitions in New York City'
  }
})

export const mutations = {
  setAcuityEnabled(state, payload) {
    state.acuityEnabled = payload
  },
  setFooter(state, footer) {
    state.footer = footer
  },
  setMetaDescription(state, description) {
    state.meta.description = description
  },
  setMetaImage(state, image) {
    state.meta.image = image
  },
  setMetaTitle(state, title) {
    state.meta.title = title
  }
}

export const actions = {
  setMeta({ commit }, meta) {
    const description = meta?.description
    const image = meta?.image?.asset?.url
    const title = meta?.title

    description && commit('setMetaDescription', description)
    image && commit('setMetaImage', image + '?q=60&w=1200')
    title && commit('setMetaTitle', title)
  }
}

export const getters = {
  getAcuityEnabled: state => state.acuityEnabled,
  getFooter: state => state.footer,
  getMetaDescription: state => state.meta.description,
  getMetaImage: state => state.meta.image,
  getMetaTitle: state => state.meta.title
}
