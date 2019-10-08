module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'KyivMusicFilm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'KyivMusicFilm — незалежний дистриб\'ютор фільмів про музику та нову культуру, авторського кіно, а також спеціальних подій на великому екрані.' }
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/styles/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  devModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  auth: {
    watchLoggedIn: false
  },
  axios: {
    baseURL: 'https://kyivmusicfilm.com'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['vue2-google-maps']
  },
  plugins: [
    { src: '~/plugins/vue2-google-maps', ssr: false },
    { src: '~/plugins/vue-moment', ssr: false },
    { src: '~/plugins/vue-fullcalendar', ssr: false }
  ]

}
