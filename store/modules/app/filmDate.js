import * as types from '@/store/mutationTypes'

function hidePreviousDates (filmDates, today) {
  return filmDates.filter(filmDate => filmDate.date >= today)
}

const state = () => ({
  selectedDate: null,
  dates: null
})

const getters = {}

const mutations = {
  [types.SET_FILM_DATES] (state, dates) {
    state.dates = dates
  },
  [types.SELECT_DATE] (state, date) {
    state.selectedDate = date
  }
}

const actions = {
  saveDatesForLocation ({ commit, rootState }, location) {
    const filmDates = rootState.film.film_dates

    const filmDatesForLocation = filmDates.filter(item => item.city === location)[0]

    if (filmDatesForLocation && filmDatesForLocation.dates) {
      const actualDates = hidePreviousDates(filmDatesForLocation.dates, new Date().getMilliseconds())
      const todayFilmDate = actualDates[0]

      commit(types.SET_FILM_DATES, actualDates)
      commit(types.SELECT_DATE, todayFilmDate)
    }
  },
  selectDate ({ commit }, date) {
    commit(types.SELECT_DATE, date)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
