import * as types from '@/store/mutationTypes'

function hidePreviousDates (filmDates, today) {
  return filmDates.filter(filmDate => filmDate >= today)
}

function sortShowings (data) {
  return data.sort((a, b) => a - b)
}

const state = () => ({
  selectedShowingDate: null,
  selectedShowingCinemas: null,
  allActualDates: null
})

const getters = {}

const mutations = {
  [types.SAVE_ALL_SHOWINGS_FOR_CITY] (state, payload) {
    state.allActualDates = payload
  },
  [types.SELECT_SHOWING_FOR_CITY] (state, payload) {
    state.selectedShowingDate = payload.date
    state.selectedShowingCinemas = payload.cinemas
  }
}

const actions = {

  saveShowingsForLocation ({ commit, rootState }, locationName) {
    const filmCinemas = rootState.film.showings.cinemas
    const filmDates = rootState.film.showings.dates[locationName]

    if (filmDates && filmDates.length) {
      const actualDates = sortShowings(hidePreviousDates(filmDates, new Date().getMilliseconds()))
      const closestDate = actualDates[0]

      commit(types.SAVE_ALL_SHOWINGS_FOR_CITY, actualDates)
      commit(types.SELECT_SHOWING_FOR_CITY, { date: closestDate, cinemas: filmCinemas[locationName][closestDate] })
    }
  },
  selectShowing ({ commit, rootState }, payload) {
    const filmCinemas = rootState.film.showings.cinemas
    const filmLocation = rootState.map.location.name

    commit(types.SELECT_SHOWING_FOR_CITY, { date: payload.date, cinemas: filmCinemas[filmLocation][payload.date] })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
