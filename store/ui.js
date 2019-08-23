export const state = () => ({
  locationMenuShown: false,
  locationMenuType: null,
  loading: false
})

export const getters = {}

export const mutations = {
  SHOW_LOCATION_MENU (state, options) {
    // TODO rewrite
    if (options.error) {
      state.locationMenuType = 'ERROR_TYPE'
    } else if (options.different_location) {
      state.locationMenuType = 'DIFFERENT_LOCATION_TYPE'
    } else {
      state.locationMenuType = 'DEFAULT_TYPE'
    }

    state.locationMenuShown = true
  },
  HIDE_LOCATION_MENU (state) {
    state.locationMenuShown = false
    state.locationMenuType = null
  },
  SHOW_LOADER (state) {
    state.loading = true
  },
  HIDE_LOADER (state) {
    state.loading = false
  }
}

export const actions = {
  showLocationMenu ({ commit }, options = {}) {
    commit('SHOW_LOCATION_MENU', options)
  },
  hideLocationMenu ({ commit }) {
    commit('HIDE_LOCATION_MENU')
  },
  showLoader ({ commit }) {
    commit('SHOW_LOADER')
  },
  hideLoader ({ commit }) {
    commit('HIDE_LOADER')
  }
}
