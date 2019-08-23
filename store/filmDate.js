function hidePreviousDates (filmDates, today) {
  return filmDates.filter(filmDate => filmDate.date >= today)
}

export const state = () => ({
  selectedDate: null,
  dates: null
})

export const getters = {}

export const mutations = {
  SET_FILM_DATES (state, dates) {
    state.dates = dates
  },
  SELECT_DATE (state, date) {
    state.selectedDate = date
  }
}

export const actions = {
  saveDatesForLocation ({ commit, rootState }, location) {
    const filmDates = rootState.film.film_dates

    const filmDatesForLocation = filmDates.filter(item => item.city === location)[0]

    if (filmDatesForLocation && filmDatesForLocation.dates) {
      const actualDates = hidePreviousDates(filmDatesForLocation.dates, new Date().getMilliseconds())
      const todayFilmDate = actualDates[0]

      commit('SET_FILM_DATES', actualDates)
      commit('SELECT_DATE', todayFilmDate)
    }
  },
  selectDate ({ commit }, date) {
    commit('SELECT_DATE', date)
  }
}
