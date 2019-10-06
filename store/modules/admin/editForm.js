import * as types from '@/store/mutationTypes'
import { transliterate } from '@/utils/textUtils'

const initialFilmState = {
  name: null,
  url: null,
  description_full: null,
  description_short: null,
  trailer: null,
  image_desktop: null,
  image_mobile: null
}

const state = () => ({
  name: null,
  url: null,
  description_full: null,
  description_short: null,
  trailer: null,
  image_desktop: null,
  image_mobile: null
})

const getters = {}

const mutations = {
  [types.SAVE_FILM_DESCRIPTION] (state, description) {
    state.name = description.name
    state.url = description.url
    state.description_full = description.description_full
    state.description_short = description.description_short
    state.trailer = description.trailer
    state.image_desktop = description.image_desktop
    state.image_mobile = description.image_mobile
  },
  [types.UPDATE_FILM_NAME] (state, payload) {
    state.name = payload
  },
  [types.UPDATE_FILM_URL] (state, payload) {
    state.url = transliterate(payload).toLowerCase()
  },
  [types.UPDATE_FILM_FULL_DESCRIPTION] (state, payload) {
    state.description_full = payload
  },
  [types.UPDATE_FILM_SHORT_DESCRIPTION] (state, payload) {
    state.description_short = payload
  },
  [types.UPDATE_FILM_TRAILER] (state, payload) {
    state.trailer = payload
  },
  [types.UPDATE_FILM_DESKTOP_IMAGE] (state, payload) {
    state.image_desktop = payload
  },
  [types.UPDATE_FILM_MOBILE_IMAGE] (state, payload) {
    state.image_mobile = payload
  },
  [types.RESET_FILM] (state) {
    state = initialFilmState
  }
}

const actions = {
  saveFilmDescription ({ commit }, filmDescription) {
    commit(types.SAVE_FILM_DESCRIPTION, filmDescription)
  },
  updateFilmName ({ commit }, updatedFilmName) {
    commit(types.UPDATE_FILM_NAME, updatedFilmName)
  },
  updateFilmURL ({ commit }, updatedFilmURL) {
    commit(types.UPDATE_FILM_URL, updatedFilmURL)
  },
  updateFilmTrailer ({ commit }, updatedFilmTrailer) {
    commit(types.UPDATE_FILM_TRAILER, updatedFilmTrailer)
  },
  updateFilmFullDescription ({ commit }, updatedFullDescription) {
    commit(types.UPDATE_FILM_FULL_DESCRIPTION, updatedFullDescription)
  },
  updateFilmShortDescription ({ commit }, updatedShortDescription) {
    commit(types.UPDATE_FILM_SHORT_DESCRIPTION, updatedShortDescription)
  },
  async updateFilmDesktopImage ({ commit }, updateFilmDesktopImage) {
    commit(types.UPDATE_FILM_DESKTOP_IMAGE, updateFilmDesktopImage)
  },
  updateFilmMobileImage ({ commit }, updateFilmMobileImage) {
    commit(types.UPDATE_FILM_MOBILE_IMAGE, updateFilmMobileImage)
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
