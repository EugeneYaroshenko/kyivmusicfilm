export const state = () => ({
  trailerShown: false
})

export const getters = {}

export const mutations = {
  SHOW_TRAILER (state) {
    state.trailerShown = true
  },
  HIDE_TRAILER (state) {
    state.trailerShown = false
  }
}

export const actions = {
  showTrailer ({ commit }) {
    commit('SHOW_TRAILER')
  },
  hideTrailer ({ commit }) {
    commit('HIDE_TRAILER')
  }
}
