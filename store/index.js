import exhibitionsQuery from '~/apollo/queries/sanity/exhibitionsNav'
import settingsQuery from '~/apollo/queries/sanity/settings'
import shopNavigation from '@/apollo/queries/sanity/shopNavigation'

export const state = () => ({})

export const actions = {
  async nuxtServerInit({ commit, dispatch }, context) {
    const client = context.app.apolloProvider.defaultClient

    const settingsResponse = await client.query({
      query: settingsQuery
    })
    commit('settings/setAcuityEnabled', settingsResponse.data.settings.acuityEnabled) // prettier-ignore
    commit('settings/setFooter', settingsResponse.data.settings.footer)
    dispatch('settings/setMeta', settingsResponse.data.settings.meta)

    const exhibitionsResponse = await client.query({ query: exhibitionsQuery })
    commit('subnav/setExhibitionsNav', exhibitionsResponse.data.exhibitions)

    const shopNavResponse = await client.query({ query: shopNavigation })
    commit(
      'subnav/setShopNav',
      shopNavResponse.data.shopPage.navigation.regularCollections
    )
  }
}
