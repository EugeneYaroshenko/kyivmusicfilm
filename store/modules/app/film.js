import * as types from '~/store/mutationTypes'

const state = () => ({
  description: null,
  showings: null,
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {}

const mutations = {
  [types.GET_FILM_REQUEST] (state) {
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.GET_FILM_SUCCESS] (state, payload) {
    state.showings = payload.showings
    state.description = payload.description
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.GET_FILM_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
  },
}

const actions = {
  async getFilmByName ({ state, commit, dispatch }, payload) {
    commit(types.GET_FILM_REQUEST)

    try {
      const response = await this.$axios.$get('/api/films/' + payload.url)

      commit(types.GET_FILM_SUCCESS, response.data)
      return response.data
    } catch (error) {
      commit(types.GET_FILM_ERROR, error)
      return error
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
