import * as types from '@/store/mutationTypes'

const state = () => ({
  all: null
})

const getters = {}

const mutations = {
  [types.SAVE_FILM_LOCATIONS] (state, payload) {
    state.all = payload
  }
}

const actions = {
  saveFilmLocations ({ commit, rootState }, showings) {
    const allLocations = showings.map(filmShowing => {
      return rootState.locations.all.filter(location => location.name === filmShowing.city)[0]
    })

    commit(types.SAVE_FILM_LOCATIONS, allLocations)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
