export const state = () => ({
  general: {
    name: null,
    url_name: null,
    description_full: null,
    description_short: null,
    trailer_link: 'https://youtu.be/wUVo65Ce8Rs',
    images: {
      desktop: null,
      mobile: null
    }
  },
  location: [
    {
      name: 'kyiv',
      name_ukr: 'київ',
      position: { lat: 50.4518494, lng: 30.5207913 }
    }
  ],
  showing: [
    {
      city: 'kyiv',
      dates: [
        { date: 1567285200000, cinema_array: ['жовтень', 'планета кіно блокбастер'] },
        { date: 1567371600000, cinema_array: ['Планета Кіно Блокбастер', 'МУЛЬТИПЛЕКС ТРЦ "LAVINA MALL"'] },
        { date: 1567630800000, cinema_array: ['Планета Кіно Блокбастер', 'МУЛЬТИПЛЕКС ТРЦ "LAVINA MALL"', 'жовтень'] },
        { date: 1567803600000, cinema_array: ['Планета Кіно Блокбастер'] },
        { date: 1568062800000, cinema_array: ['Планета Кіно Блокбастер'] },
        { date: 1568235600000, cinema_array: ['Жовтень'] }
      ]
    },
    {
      city: 'одеса',
      dates: [
        { date: 1567285200000, cinema_array: ['Зелений театр'] },
        { date: 1568494800000, cinema_array: ['Планета Кіно – Одеса (Таїрова)'] },
      ]
    },
    {
      city: 'львів',
      dates: [
        { date: 1567285200000, cinema_array: ['Зелений театр'] }
      ]
    },
  ]
})

export const getters = {
  getShowingDatesByCity: (state) => (city) => {
    return state.showing[city].dates.map(dateItem => {
      // TODO MOMENT.JS DATE
      return {
        title: 'Сеанс',
        start: dateItem.date,
        end: dateItem.date
      }
    })
  },
  getShowingCinemasForDateByCity: (state) => ({ city, date }) => {
    const showingDate = state.showing[city].dates.filter(dateItem => dateItem.date === date)

    return showingDate.cinema_array
  }
}

export const mutations = {
  ADD_SHOWING_DATE (state, payload) {
    const newShowingDate = { date: payload.date, cinema_array: null }

    if (checkIfShowingCitiesExist(state.showing, payload.city)) {
      const updatedShowingDates = [...state.showing[payload.city].dates, ...[newShowingDate]]
      state.showing[payload.city].dates = updatedShowingDates
    } else {
      state.showing = [...state.showing, [{ city: payload.city, dates: [newShowingDate] }]]
    }
  },
  REMOVE_SHOWING_DATE (state, payload) {
    const showingDatesWithoutRemovedDate = state.showing[payload.city].dates.filter(dateItem => dateItem.date !== payload.date)

    state.showing[payload.city].dates = showingDatesWithoutRemovedDate
  },
  UPDATE_SHOWING_DATE (state, payload) {
    const updatedShowingDates = state.showing[payload.city].dates.map(dateItem => {
      if (dateItem.date === payload.date) {
        return { date: payload.date, cinema_array: payload.cinemas }
      } else {
        return dateItem
      }
    })

    state.showing[payload.city].dates = updatedShowingDates
  },
  ADD_SHOWING_CITY (state, payload) {
    const newShowingCity = { city: payload.city, dates: null }
    state.showing = [...state.showing, ...[newShowingCity]]
  },
  REMOVE_SHOWING_CITY (state, payload) {
    const showingCitiesWithoutRemovedCity = state.showing.filter(showingItem => showingItem.city !== payload.city)
    state.showing = showingCitiesWithoutRemovedCity
  },
}

export const actions = {
  addShowingDate ({ commit }, payload) {
   commit('ADD_SHOWING_DATE', payload)
  },
  removeShowingDate ({ commit }, payload) {
    commit('REMOVE_SHOWING_DATE', payload)
  },
  updateShowingDate ({ commit }, payload) {
    commit('UPDATE_SHOWING_DATE', payload)
  },
  addShowingCinema ({ commit }, payload) {
    commit('ADD_SHOWING_CINEMA', payload)
  }
}


function checkIfShowingCitiesExist (showingArray, city) {
  return showingArray.filter(showing => showing.city === city).length > 0

}
