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
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
  },
  [types.DELETE_FILM_REQUEST] (state) {
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.DELETE_FILM_SUCCESS] (state, deletedFilm) {
    const updatedFilms = state.data.filter(film => film._id !== deletedFilm._id)

    state.data = updatedFilms
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.DELETE_FILM_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
  },
}

const actions = {
  async getAll ({ commit }) {
    commit(types.GET_FILMS_REQUEST)
    try {
      const filmsRequest = await this.$axios.$get('/api/films')

      console.log(filmsRequest)

      commit(types.GET_FILMS_SUCCESS, filmsRequest)
    } catch (error) {
      commit(types.GET_FILMS_ERROR, error)
    }
  },
  async deleteFilm ({ commit }, film) {
    commit(types.DELETE_FILM_REQUEST)

    try {
      const deletedFilm = await this.$axios.$delete(`/api/films/${film._id}`)

      commit(types.DELETE_FILM_SUCCESS, film)
    } catch (error) {
      commit(types.DELETE_FILM_ERROR, error)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
