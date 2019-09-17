import * as types from '@/store/mutationTypes'

const state = () => ({
  data: null,
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {
}

const mutations = {
  [types.GET_FILMS_REQUEST] (state) {
    state.data = null
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.GET_FILMS_SUCCESS] (state, payload) {
    state.data = payload.data
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.GET_FILMS_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, errors: payload.error }
  }
}

const actions = {
  async getAll ({ commit }) {
    commit(types.GET_FILMS_REQUEST)
    try {
      const filmsRequest = await this.$axios.$get('/api/films')

      commit(types.GET_FILMS_SUCCESS, filmsRequest)
    } catch (error) {
      commit(types.GET_FILMS_ERROR, error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
