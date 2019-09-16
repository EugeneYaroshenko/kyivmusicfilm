import * as types from '@/store/mutationTypes'

const state = () => ({
  selectedShowingDatesByCity: null
})

const getters = {
  getSelectedDateForCity: (state) => (city) => {
    const selectedCityDate = state.selectedShowingDatesByCity
      ? state.selectedShowingDatesByCity[city]
      : null

    return selectedCityDate
  }
}

const mutations = {
  [types.UI_ADD_SELECTED_SHOWING_DATE_FOR_CITY] (state, payload) {
    const updatedSelectedShowingDatesByCity = updateSelectedShowingDates(state.selectedShowingDatesByCity, payload)

    state.selectedShowingDatesByCity = updatedSelectedShowingDatesByCity
  },
  [types.UI_REMOVE_SELECTED_SHOWING_DATE_FOR_CITY] (state, payload) {
    const selectedShowingDatesByCityWithoutRemoved = removeSelectedShowingDate(state.selectedShowingDatesByCity, payload)

    state.selectedShowingDatesByCity = selectedShowingDatesByCityWithoutRemoved
  }
}

const actions = {
  selectDate ({ commit }, payload) {
   commit(types.UI_ADD_SELECTED_SHOWING_DATE_FOR_CITY, payload)
  },
  removeSelectedDate ({ commit }, payload) {
    commit(types.UI_REMOVE_SELECTED_SHOWING_DATE_FOR_CITY, payload)
  }
}

function updateSelectedShowingDates (showingDates, { city, date }) {
    return showingDates ? { ...showingDates, ...{ [city]: date } } : { [city]: date }
}

function removeSelectedShowingDate (showingDates, { city }) {
  return { ...showingDates, ...{ [city]: null } }
}

export default {
  state,
  getters,
  mutations,
  actions
}
