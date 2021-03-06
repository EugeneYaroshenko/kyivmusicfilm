const isProd = process.env.NODE_ENV === 'production'

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
      {
        hid: 'description',
        name: 'description',
        content: 'KyivMusicFilm — незалежний дистриб\'ютор фільмів про музику та нову культуру, авторського кіно, а також спеціальних подій на великому екрані.'
      }
    ],
    script: [
      { innerHTML: 'document.querySelector("html")' }
    ],
    link: [

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },
  env: {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://kyivmusicfilm.com' : 'localhost:3000'
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
    '@nuxtjs/proxy',
    'nuxt-facebook-pixel-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-154152946-1',
      debug: {
        enabled: !isProd,
        sendHitTask: isProd
      }
    }]
  ],
  facebook: {
    track: 'PageView',
    pixelId: '1375285412646391',
    disabled: process.env.NODE_ENV !== 'production'
  },
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://kyivmusicfilm.com' : 'http://localhost:3000'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [
      'vue2-google-maps',
      'gsap/umd/TweenMax',
      'gsap/umd/TimelineMax',
      'gsap/umd/TimelineLite',
      'gsap/umd/EasePack'
    ]
  },
  plugins: [
    { src: '~/plugins/vue2-google-maps', ssr: false },
    { src: '~/plugins/vue-moment', ssr: false },
    { src: '~/plugins/vue-fullcalendar', ssr: false },
    { src: '~/plugins/vue-youtube', ssr: false },
    { src: '~plugins/vue-scroll', ssr: false }
  ]

}
