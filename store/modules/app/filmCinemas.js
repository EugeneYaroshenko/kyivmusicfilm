import * as types from '~/store/mutationTypes'

const state = () => ({
  all: null
})

const getters = {}

const mutations = {
  [types.SAVE_FILM_CINEMAS] (state, payload) {
    state.all = payload
  }
}

const actions = {
  saveFilmCinemas ({ commit, rootState }, showings) {
    const filmCinemas = showings.map(filmShowingItem => {
      const allShowingCinemas = mergeShowingCinemas(filmShowingItem.dates)
      const cityCinemas = rootState.cinemas.all.filter(cinemaItem => cinemaItem.location === filmShowingItem.city)[0]

      const filteredCityCinemas = cityCinemas.cinema_array.filter(cinema => allShowingCinemas.includes(cinema.name))

      return { ...cityCinemas, ...{ cinema_array: filteredCityCinemas } }
    })

    commit(types.SAVE_FILM_CINEMAS, filmCinemas)
  }
}

function mergeShowingCinemas (dates) {
  let cinemas = []

  dates.forEach(dateItem => {
    const mergedUniqueCinemas = cinemas.concat(dateItem.cinema_array.filter(cinema => cinemas.indexOf(cinema) < 0))
    cinemas = mergedUniqueCinemas
  })

  return cinemas
}

export default {
  state,
  getters,
  mutations,
  actions
}
