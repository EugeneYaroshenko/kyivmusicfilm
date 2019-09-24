// TODO divide into two different files - general and showings

import * as types from '@/store/mutationTypes'

const initialFilmState = {
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

const getters = {
}

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
  }
}

const actions = {
  createFilm ({ commit }) {
    commit(types.CREATE_FILM)
  },
  editFilm ({ commit, dispatch }, payload) {
    commit(types.EDIT_FILM, payload)
    dispatch('editForm/saveFilmDescription', state.description, { root: true })
    dispatch('editShowings/saveFilmShowings', state.showings, { root: true })
  },
  async saveFilm ({ state, commit }) {
    commit(types.SAVE_FILM_REQUEST)

    try {
      const apiURL = state.film._id ? `/api/films/${state.film._id}` : '/api/films'
      const savedFilm = await this.$axios.$post(apiURL, { general: state.film.general, showings: state.film.showings })

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
