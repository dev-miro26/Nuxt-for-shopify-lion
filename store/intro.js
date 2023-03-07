export const state = () => ({
  desktopUrl: null,
  mobileUrl: null,
  played: false,
  showModal: true
})

export const mutations = {
  setDesktopUrl(state, url) {
    state.desktopUrl = url
  },
  setMobileUrl(state, url) {
    state.mobileUrl = url
  },
  setPlayed(state) {
    state.played = true
  },
  setModalClosed(state) {
    state.showModal = false
  }
}
