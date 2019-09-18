// TODO divide into two different files - general and showings

import Vue from 'vue'
import * as types from '@/store/mutationTypes'
import { transliterate } from '@/utils/textUtils'

const initialFilmState = {
  film: {
    id: null,
    general: {
      name: null,
      url: null,
      description_full: null,
      description_short: null,
      trailer: null,
      image_desktop: null,
      image_mobile: null
    },
    showings: []
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
    general: {
      name: null,
      url: null,
      description_full: null,
      description_short: null,
      trailer: null,
      image_desktop: null,
      image_mobile: null
    },
    showings: []
  },
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {
  getShowingDatesByCity: (state) => (selectedCity) => {
    const selectedCityShowingDates = state.film.showings.filter(showingInfo => showingInfo.city === selectedCity)[0].dates
    return selectedCityShowingDates ? selectedCityShowingDates.map(dateItem => {
      const date = Vue.moment(dateItem.date).format('YYYY-MM-DD')
      return {
        title: Vue.moment(dateItem.date).format('DD'),
        start: date,
        end: date
      }
    }) : []
  },
  getShowingCinemasForDateAndCity: (state) => ({ city, date }) => {
    // TODO simplify
    const showingCity = state.film.showings.filter(showingItem => showingItem.city === city)[0]
    const selectedShowingDate = showingCity.dates.filter(dateItem => dateItem.date === date)[0]

    return selectedShowingDate.cinema_array
  }
}

const mutations = {
  [types.EDIT_FILM] (state, payload) {
    state.film = payload
  },
  [types.CREATE_FILM] (state) {
    state = initialFilmState
  },
  [types.ADD_SHOWING_DATE] (state, payload) {
    const newShowingDate = { date: payload.date, cinema_array: null }

    if (checkIfShowingCityExist(state.film.showings, payload.city)) {
      const updatedShowings = state.film.showings.map(showingInfo => {
        return showingInfo.city === payload.city
          ? { ...showingInfo, dates: [...showingInfo.dates, ...[newShowingDate]] }
          : showingInfo
      })

      state.film.showings = updatedShowings
    } else {
      state.film.showings = [...state.film.showings, [{ city: payload.city, dates: [newShowingDate] }]]
    }
  },
  [types.REMOVE_SHOWING_DATE] (state, payload) {
    const updatedShowingsWithoutRemovedDate = state.film.showings.map(showingInfo => {
      return showingInfo.city === payload.city
        ? { ...showingInfo, ...{ dates: showingInfo.dates.filter(dateItem => dateItem.date !== payload.date) } }
        : showingInfo
    })

    state.film.showings = updatedShowingsWithoutRemovedDate
  },
  [types.UPDATE_SHOWING_DATE] (state, payload) {
    const updatedShowings = state.film.showings.map(showingInfo => {
      return showingInfo.city === payload.city
      ? { ...showingInfo, ...{ dates: updateShowingDates(showingInfo.dates, payload.date, payload.cinemas) } }
      : showingInfo
    })

    state.film.showings = updatedShowings
  },
  [types.ADD_SHOWING_CITY] (state, payload) {
    const newShowingCity = { city: payload.city, dates: [] }
    state.film.showings = [...state.film.showings, ...[newShowingCity]]
  },
  [types.REMOVE_SHOWING_CITY] (state, payload) {
    const showingCitiesWithoutRemovedCity = state.film.showings.filter(showingItem => showingItem.city !== payload.city)
    state.film.showings = showingCitiesWithoutRemovedCity
  },
  [types.UPDATE_FILM_NAME] (state, payload) {
    state.film.general.name = payload
  },
  [types.UPDATE_FILM_URL] (state, payload) {
    state.film.general.url = transliterate(payload).toLowerCase()
  },
  [types.UPDATE_FILM_FULL_DESCRIPTION] (state, payload) {
    state.film.general.description_full = payload
  },
  [types.UPDATE_FILM_SHORT_DESCRIPTION] (state, payload) {
    state.film.general.description_short = payload
  },
  [types.UPDATE_FILM_TRAILER] (state, payload) {
    state.film.general.trailer = payload
  },
  [types.UPDATE_FILM_DESKTOP_IMAGE] (state, payload) {
    state.film.general.image_desktop = payload
  },
  [types.UPDATE_FILM_MOBILE_IMAGE] (state, payload) {
    state.film.general.image_mobile = payload
  },
  [types.SAVE_FILM_REQUEST] (state) {
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.SAVE_FILM_SUCCESS] (state, payload) {
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.SAVE_FILM_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
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
  editFilm ({ commit }, payload) {
    commit(types.EDIT_FILM, payload)
  },
  addShowingDate ({ commit }, payload) {
   commit(types.ADD_SHOWING_DATE, payload)
  },
  removeShowingDate ({ commit }, payload) {
    commit(types.REMOVE_SHOWING_DATE, payload)
  },
  updateShowingDate ({ commit }, payload) {
    commit(types.UPDATE_SHOWING_DATE, payload)
  },
  addShowingCity ({ commit }, payload) {
    commit(types.ADD_SHOWING_CITY, payload)
  },
  removeShowingCity ({ commit }, payload) {
    commit(types.REMOVE_SHOWING_CITY, payload)
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
  updateFilmDesktopImage ({ commit }, updateFilmDesktopImage) {
    commit(types.UPDATE_FILM_DESKTOP_IMAGE, updateFilmDesktopImage)
  },
  updateFilmMobileImage ({ commit }, updateFilmMobileImage) {
    commit(types.UPDATE_FILM_MOBILE_IMAGE, updateFilmMobileImage)
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

function checkIfShowingCityExist (showingsArray, city) {
  return showingsArray.filter(showing => showing.city === city).length > 0
}

function updateShowingDates (showingsDates, updatedDate, updatedCinemas) {
  return showingsDates.map(dateItem => {
    if (dateItem.date === updatedDate) {
      return { date: updatedDate, cinema_array: updatedCinemas }
    } else {
      return dateItem
    }
  })
}

export default {
  state,
  getters,
  mutations,
  actions
}
