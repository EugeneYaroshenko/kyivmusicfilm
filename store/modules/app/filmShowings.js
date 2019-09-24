import * as types from '@/store/mutationTypes'

function hidePreviousDates (filmShowings, today) {
  return filmShowings.filter(filmShowings => filmShowings.date >= today)
}

function sortShowings (data) {
  return data.sort((a, b) => a.date.localeCompare(b.date))
}

const state = () => ({
  selectedShowingDate: null,
  selectedShowingCinemas: null,
  allShowingsForCity: null
})

const getters = {}

const mutations = {
  [types.SAVE_ALL_SHOWINGS_FOR_CITY] (state, payload) {
    state.allShowingsForCity = payload
  },
  [types.SELECT_SHOWING_FOR_CITY] (state, payload) {
    state.selectedShowingDate = payload.date
    state.selectedShowingCinemas = payload.cinema_array
  }
}

const actions = {

  saveShowingsForLocation ({ commit, rootState }, location) {
    const filmShowings = rootState.film.showings

    const filmShowingsForLocation = filmShowings.filter(item => item.city === location)[0]

    if (filmShowingsForLocation && filmShowingsForLocation.dates) {
      const actualShowings = sortShowings(hidePreviousDates(filmShowingsForLocation.dates, new Date().getMilliseconds()))
      const closestFilmShowing = actualShowings[0]

      commit(types.SAVE_ALL_SHOWINGS_FOR_CITY, actualShowings)
      commit(types.SELECT_SHOWING_FOR_CITY, closestFilmShowing)
    }
  },
  selectShowing ({ commit }, payload) {
    commit(types.SELECT_SHOWING_FOR_CITY, payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
