import * as types from '@/store/mutationTypes'

const state = () => ({
  locationMenuShown: false,
  locationMenuType: null,
  trailerShown: false,
  mapShown: false,
  loading: false
})

const getters = {}

const mutations = {
  [types.UI_SHOW_LOCATION_MENU] (state, options) {
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
  [types.UI_HIDE_LOCATION_MENU] (state) {
    state.locationMenuShown = false
    state.locationMenuType = null
  },
  [types.UI_SHOW_LOADER] (state) {
    state.loading = true
  },
  [types.UI_HIDE_LOADER] (state) {
    state.loading = false
  },
  [types.UI_SHOW_TRAILER] (state) {
    state.trailerShown = true
  },
  [types.UI_HIDE_TRAILER] (state) {
    state.trailerShown = false
  },
  [types.UI_SHOW_MAP] (state) {
    state.mapShown = true
  },
  [types.UI_HIDE_MAP] (state) {
    state.mapShown = false
  }
}

const actions = {
  showLocationMenu ({ commit }, options = {}) {
    commit(types.UI_SHOW_LOCATION_MENU, options)
  },
  hideLocationMenu ({ commit }) {
    commit(types.UI_HIDE_LOCATION_MENU)
  },
  showLoader ({ commit }) {
    commit(types.UI_SHOW_LOADER)
  },
  hideLoader ({ commit }) {
    commit(types.UI_HIDE_LOADER)
  },
  showTrailer ({ commit }) {
    commit(types.UI_SHOW_TRAILER)
  },
  hideTrailer ({ commit }) {
    commit(types.UI_HIDE_TRAILER)
  },
  showMap ({ commit }) {
    commit(types.UI_SHOW_MAP)
  },
  hideMap ({ commit }) {
    commit(types.UI_HIDE_MAP)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
