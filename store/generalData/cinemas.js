export const state = () => ({
  cinemas: [
    {
      location: 'kyiv',
      cinema_array: [
        {
          name: 'Жовтень',
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
        }
      ]
    }
  ]
})

export const getters = {
  getAllCinemasForLocation: (state) => (city) => {
    return state.cinemas.filter(cinemasItem => cinemasItem.location === city)
  }
}

export const mutations = {
}

export const actions = {
}
