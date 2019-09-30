import * as types from '@/store/mutationTypes'

const initialFilmState = {
  film: {
    _id: null,
    description: {
      name: null,
      url: null,
      description_full: null,
      description_short: null,
      trailer: null,
      image_desktop: null,
      image_mobile: null
    },
    showings: {
      dates: null,
      cinemas: null,
      locations: null
    }
  },
  request: {
    loading: false,
    fetched: false,
    error: null
  }
}

const state = () => ({
  film: {
    id: null,
    description: {
      name: null,
      url: null,
      description_full: null,
      description_short: null,
      trailer: null,
      image_desktop: null,
      image_mobile: null
    },
    showings: {
      dates: null,
      cinemas: null,
      locations: null
    }
  },
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {}

const mutations = {
  [types.EDIT_FILM] (state, payload) {
    state.film = payload
  },
  [types.CREATE_FILM] (state) {
    state = initialFilmState
  },
  [types.RESET_FILM] (state) {
    state = initialFilmState
  },
  [types.RESET_FILM_REQUEST] (state) {
    state.request = { fetched: false, loading: false, error: null }
  },
  [types.SAVE_FILM_REQUEST] (state, payload) {
    state.film = payload
    state.request = { fetched: false, loading: true, error: null }
  },
  [types.SAVE_FILM_SUCCESS] (state) {
    state.request = { fetched: true, loading: false, error: null }
  },
  [types.SAVE_FILM_ERROR] (state, error) {
    state.request = { fetched: true, loading: false, error: error }
  }
}

const actions = {
  create ({ commit, dispatch, state }) {
    commit(types.CREATE_FILM)
    dispatch('editForm/saveFilmDescription', state.film.description, { root: true })
    dispatch('editShowings/saveFilmShowings', state.film.showings, { root: true })
  },
  edit ({ commit, dispatch, state }, payload) {
    commit(types.EDIT_FILM, payload)
    dispatch('editForm/saveFilmDescription', state.film.description, { root: true })
    dispatch('editShowings/saveFilmShowings', state.film.showings, { root: true })
  },
  async saveFilm ({ state, rootState, commit }) {
    const showings = {
      showings: {
        cinemas: rootState.editShowings.cinemas,
        locations: rootState.editShowings.locations,
        dates: rootState.editShowings.dates
      }
    }
    const description = { description: rootState.editForm }

    const film = { ...state.film, ...showings, ...description }

    commit(types.SAVE_FILM_REQUEST, film)

    try {
      const apiURL = state.film._id ? `/api/films/${state.film._id}` : '/api/films'
      const savedFilm = await this.$axios.$post(apiURL, film)

      commit(types.SAVE_FILM_SUCCESS)
    } catch (error) {
      commit(types.SAVE_FILM_ERROR, error)
    }
  },
  resetRequest ({ commit }) {
    commit(types.RESET_FILM_REQUEST)
  },
  resetFilm ({ commit }) {
    commit(types.RESET_FILM)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
