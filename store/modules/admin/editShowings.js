import Vue from 'vue'
import uniq from 'lodash/uniq'
import omitBy from 'lodash/omitBy'
import * as types from '@/store/mutationTypes'

const initialFilmState = {
  dates: null,
  cinemas: null,
  locations: null
}

const state = () => ({
  dates: null,
  cinemas: null,
  locations: null,
  ui: {
    selectedDateForLocation: null
  }
})

const getters = {
  getShowingDatesForLocation: (state) => (selectedLocation) => {
    const selectedLocationShowingDates = state.dates[selectedLocation]
    return selectedLocationShowingDates && selectedLocationShowingDates.length ? selectedLocationShowingDates.map(dateItem => {
      const date = Vue.moment(dateItem.date).format('YYYY-MM-DD')
      return {
        title: Vue.moment(dateItem.date).format('DD'),
        start: date,
        end: date
      }
    }) : []
  },
  getShowingCinemasForDate: (state) => (selectedLocation) => {
    return state.ui.selectedDateForLocation
      ? state.cinemas[selectedLocation][state.ui.selectedDateForLocation[selectedLocation]]
      : null
  },
  getSelectedDateForLocation: (state) => (location) => {
    const selectedDate = state.ui.selectedDateForLocation
      ? state.ui.selectedShowingDatesByCity[location]
      : null

    return selectedDate
  }
}

const mutations = {
  [types.SAVE_FILM_SHOWINGS] (state, showings) {
    state = { ...state, ...showings }
  },
  [types.ADD_SHOWING_DATE] (state, { location, date }) {
    if (state.dates && state.dates[location]) {
      state.dates[location] = uniq([...state.dates[location], ...[date]])
    } else {
      state.dates[location] = [date]
    }
  },
  [types.REMOVE_SHOWING_DATE] (state, { location, date }) {
    const updatedDates = state.dates[location].filter(oldDate => oldDate !== date)

    state.dates[location] = updatedDates
  },
  [types.UI_ADD_SELECTED_SHOWING_DATE_FOR_LOCATION] (state, payload) {
    const updatedSelectedDate = updateSelectedShowingDates(state.ui.selectedDateForLocation, payload)

    state.ui.selectedDateForLocation = updatedSelectedDate
  },
  [types.UI_REMOVE_SELECTED_SHOWING_DATE_FOR_LOCATION] (state, payload) {
    const selectedDateWithoutRemoved = removeSelectedShowingDate(state.selectedShowingDatesByCity, payload)

    state.selectedShowingDatesByCity = selectedDateWithoutRemoved
  },
  [types.UPDATE_SHOWING_CINEMAS] (state, { location, date, cinemas }) {
    if (state.cinemas && state.cinemas[location]) {
      state.cinemas[location][date] = cinemas
    } else {
      state.cinemas[location] = { date: cinemas }
    }
  },
  [types.ADD_SHOWING_LOCATION] (state, location) {
    state.locations = state.locations ? [...state.locations, ...[location]] : [location]
  },
  [types.REMOVE_SHOWING_LOCATION] (state, locationToRemove) {
    const updatedLocations = state.locations.filter(location => location.name !== locationToRemove.name)
    const updatedDates = omitBy(state.dates, includesKey(value, key, locationToRemove.name))
    const updatedCinemas = omitBy(state.cinemas, includesKey(value, key, locationToRemove.name))

    state.locations = updatedLocations
    state.dates = updatedDates
    state.cinemas = updatedCinemas
  },
  [types.RESET_FILM] (state) {
    state = initialFilmState
  }
}

const actions = {
  saveFilmShowings ({ commit }, filmShowings) {
    commit(types.SAVE_FILM_SHOWINGS, filmShowings)
  },
  selectDate ({ commit }, payload) {
    commit(types.UI_ADD_SELECTED_SHOWING_DATE_FOR_LOCATION, payload)
  },
  addShowingDate ({ commit }, payload) {
   commit(types.ADD_SHOWING_DATE, payload)
  },
  removeShowingDate ({ commit }, payload) {
    commit(types.REMOVE_SHOWING_DATE, payload)
  },
  updateShowingDate ({ commit }, { location, date, cinemas }) {
    commit(types.ADD_SHOWING_DATE, { location, date })
    commit(types.UPDATE_SHOWING_CINEMAS, { location, date, cinemas })
  },
  addShowingLocation ({ commit }, payload) {
    commit(types.ADD_SHOWING_LOCATION, payload)
  },
  removeShowingLocation ({ commit }, payload) {
    commit(types.REMOVE_SHOWING_LOCATION, payload)
  },
  resetFilm ({ commit }) {
    commit(types.RESET_FILM)
  }
}

function includesKey (value, key, filterKey) {
  return key === filterKey
}

function updateSelectedShowingDates (showingDates, { location, date }) {
  return showingDates ? { ...showingDates, ...{ [location]: date } } : { [location]: date }
}

function removeSelectedShowingDate (showingDates, { location }) {
  return omitBy(showingDates, includesKey(value, key, location.name))
}

export default {
  state,
  getters,
  mutations,
  actions
}
