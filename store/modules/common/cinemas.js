const state = () => ({
  all: [
    {
      location: 'kyiv',
      cinema_array: [
        {
          name: 'жовтень',
          address: 'вулиця Костянтинівська, 26',
          position: { lat: 50.4684062, lng: 30.5079804 }
        },
        {
          name: 'Планета Кіно Блокбастер',
          address: 'проспект Степана Бандери, 34B',
          position: { lat: 50.486422, lng: 30.5179089 }
        },
        {
          name: 'Мультиплекс ТРЦ "Lavina Mall"',
          address: 'вулиця Берковецька, 6Д',
          position: { lat: 50.4966668, lng: 30.3554401 }
        }
      ]
    },
    {
      location: 'odessa',
      cinema_array: [
        {
          name: 'Зелений театр',
          address: 'вулиця Маразліївська, 34',
          position: { lat: 46.4784403, lng: 30.7335168 }
        },
        {
          name: 'Планета Кіно – Одеса (Таїрова)',
          address: 'проспект Небесної Сотні, 2',
          position: { lat: 46.4209286, lng: 30.6674826 }
        }
      ]
    },
    {
      location: 'lviv',
      cinema_array: [
        {
          name: 'Планета Кіно',
          address: 'вулиця Маразліївська, 34',
          position: { lat: 49.8497674, lng: 24.0201313 }
        },
        {
          name: 'Планета Дніпро',
          address: 'вулиця Авкокефальна, 10',
          position: { lat: 49.8497674, lng: 24.0201313 }
        }
      ]
    }
  ]
})

const getters = {
  getAllCinemasForCity: (state) => (city) => {
    const cinemas = state.all.filter(cinemaItem => cinemaItem.location === city)[0].cinema_array
    return cinemas.map(cinema => cinema.name)
  }
}

const mutations = {
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
