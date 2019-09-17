// TODO divide into two different files - general and showings

import Vue from 'vue'
import * as types from '@/store/mutationTypes'
import { transliterate } from '@/utils/textUtils'

const state = () => ({
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
  showings: [],
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {
  getShowingDatesByCity: (state) => (selectedCity) => {
    const selectedCityShowingDates = state.showings.filter(showingInfo => showingInfo.city === selectedCity)[0].dates
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
    const showingCity = state.showings.filter(showingItem => showingItem.city === city)[0]
    const selectedShowingDate = showingCity.dates.filter(dateItem => dateItem.date === date)[0]

    return selectedShowingDate.cinema_array
  }
}

const mutations = {
  [types.ADD_SHOWING_DATE] (state, payload) {
    const newShowingDate = { date: payload.date, cinema_array: null }

    if (checkIfShowingCityExist(state.showings, payload.city)) {
      const updatedShowings = state.showings.map(showingInfo => {
        return showingInfo.city === payload.city
          ? { ...showingInfo, dates: [...showingInfo.dates, ...[newShowingDate]] }
          : showingInfo
      })

      state.showings = updatedShowings
    } else {
      state.showings = [...state.showings, [{ city: payload.city, dates: [newShowingDate] }]]
    }
  },
  [types.REMOVE_SHOWING_DATE] (state, payload) {
    const updatedShowingsWithoutRemovedDate = state.showings.map(showingInfo => {
      return showingInfo.city === payload.city
        ? { ...showingInfo, ...{ dates: showingInfo.dates.filter(dateItem => dateItem.date !== payload.date) } }
        : showingInfo
    })

    state.showings = updatedShowingsWithoutRemovedDate
  },
  [types.UPDATE_SHOWING_DATE] (state, payload) {
    const updatedShowings = state.showings.map(showingInfo => {
      return showingInfo.city === payload.city
      ? { ...showingInfo, ...{ dates: updateShowingDates(showingInfo.dates, payload.date, payload.cinemas) } }
      : showingInfo
    })

    state.showings = updatedShowings
  },
  [types.ADD_SHOWING_CITY] (state, payload) {
    const newShowingCity = { city: payload.city, dates: [] }
    state.showings = [...state.showings, ...[newShowingCity]]
  },
  [types.REMOVE_SHOWING_CITY] (state, payload) {
    const showingCitiesWithoutRemovedCity = state.showings.filter(showingItem => showingItem.city !== payload.city)
    state.showings = showingCitiesWithoutRemovedCity
  },
  [types.UPDATE_FILM_NAME] (state, payload) {
    state.general.name = payload
  },
  [types.UPDATE_FILM_URL] (state, payload) {
    state.general.url = transliterate(payload).toLowerCase()
  },
  [types.UPDATE_FILM_FULL_DESCRIPTION] (state, payload) {
    state.general.description_full = payload
  },
  [types.UPDATE_FILM_SHORT_DESCRIPTION] (state, payload) {
    state.general.description_short = payload
  },
  [types.UPDATE_FILM_TRAILER] (state, payload) {
    state.general.trailer = payload
  },
  [types.UPDATE_FILM_DESKTOP_IMAGE] (state, payload) {
    state.general.image_desktop = payload
  },
  [types.UPDATE_FILM_MOBILE_IMAGE] (state, payload) {
    state.general.image_mobile = payload
  },
  [types.SAVE_FILM_REQUEST] (state) {
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.SAVE_FILM_SUCCESS] (state, payload) {
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.SAVE_FILM_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
  }
}

const actions = {
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
      const savedFilm = await this.$axios.$post('/api/films', { general: state.general, showings: state.showings})

      commit(types.SAVE_FILM_SUCCESS)
    } catch (error) {
      commit(types.SAVE_FILM_ERROR, error)
    }
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
