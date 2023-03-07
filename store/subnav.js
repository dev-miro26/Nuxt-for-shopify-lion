export const state = () => ({
  exhibitionsNav: [],
  locations: [],
  plus: [
    {
      label: 'Mission',
      link: '#mission'
    }
  ],
  collections: []
})

export const mutations = {
  setExhibitionsNav(state, exhibitions) {
    const exhibitionTypes = [
      ...new Set(exhibitions.map(exhibition => exhibition.type))
    ]
    state.exhibitionsNav = exhibitionTypes.map(type => ({
      label: type,
      link: `/exhibitions/${type}`
    }))
  },
  setLocationsNav(state, locations) {
    state.locations = locations.map(location => ({
      label: location.shortName,
      link: `/about/locations/${location.slug.current}`
    }))
  },
  setShopNav(state, collections) {
    state.collections = collections.map(collection => ({
      label: collection.displayName,
      link: `/shop/${collection.handle}`
    }))
  }
}

export const getters = {
  getAboutNav: state => state.about,
  getExhibitionsNav: state => state.exhibitionsNav,
  getLocationsNav: state => state.locations,
  getPlusNav: state => state.plus,
  getShopNav: state => state.collections
}
