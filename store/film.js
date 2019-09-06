export const state = () => ({
  information: {
    title: 'Геніальний Кутюр\'є',
    country: 'Франція',
    genre: 'Документальний фільм',
    duration: '74 хв',
    year: '2019',
    description: '«Геніальний кутюр’є» — документальна стрічка про останні роки легендарного Іва Сен-Лорана та його модний дім.',
    trailer_link: 'https://youtu.be/wUVo65Ce8Rs'
  },
  location: [
    {
      name: 'київ',
      name_eng: 'kyiv',
      position: { lat: 50.4518494, lng: 30.5207913 }
    },
    {
      name: 'одеса',
      name_eng: 'odessa',
      position: { lat: 46.4714387, lng: 30.7422883 }
    },
    {
      name: 'львів',
      name_eng: 'lviv',
      position: { lat: 49.8422254, lng: 24.0282453 }
    }
  ],
  cinema: [
    {
      location: 'київ',
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
      location: 'одеса',
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
      location: 'львів',
      cinema_array: [
        {
          name: 'Планета Кіно',
          address: 'вулиця Маразліївська, 34',
          position: { lat: 49.8497674, lng: 24.0201313 }
        }
      ]
    }
  ],
  film_dates: [
    {
      city: 'київ',
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

export const getters = {}

export const mutations = {
}

export const actions = {

}
