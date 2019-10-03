<template>
  <section class="container">
    <loader-component/>
    <div
      class="main-menu"
      :class="{'main-menu--shown': isMenuShown}"
    >
      <div
        class="main-menu__navigation"
        :class="{'main-menu__navigation--collapsed': !isMenuShown}"
        @click="toggleMainMenu"
      />
      <div class="main-menu__content">
        <div class="logo" />
        <div class="navigation-links">
          <h3><a target="_blank" href="https://www.facebook.com/KyivMusicFilm/">Facebook</a></h3>
          <h3><a target="_blank" href="https://www.instagram.com/kyivmusicfilm/">Instagram</a></h3>
          <h3><a target="_blank" href="https://www.youtube.com/channel/UCOW9MxduCFNClCOPqbQZTjg">Youtube</a></h3>
        </div>
      </div>
    </div>
    <div
      class="main"
      v-if="filmFetched"
    >
      <div
        :class="{'preview-image': true, 'preview-image--expanded': trailerShown}"
        :style="{ backgroundImage: 'url(' + filmDescription.image_desktop + ')' }"
      >
        <trailer-component v-if="trailerShown" />
        <div class="preview-mobile">
          <preview-trailer-interaction />
        </div>
      </div>
      <div :class="{'main__film-info': true, 'main__film-info--condensed': mapShown}">
        <film-info-component />
        <div :class="{'film-info__overflow': true, 'film-info__overflow--hidden': !mapShown}" />
      </div>
      <div class="main__film-cinema">
        <cinema-screening-component />
      </div>
      <div
        :class="{'main__film-map': true, 'main__film-map--condensed': !mapShown}"
      >
        <cinema-map-component />
      </div>
    </div>
  </section>
</template>

<script>
  import NavigationComponent from '~/components/app/elements/navigation'
  import FilmInfoComponent from '~/components/app/elements/filmInfo'
  import CinemaScreeningComponent from '~/components/app/sections//cinemaScreening'
  import CinemaMapComponent from '~/components/app/sections/cinemaMap'
  import TrailerComponent from '~/components/app/sections/trailer'
  import PreviewTrailerInteraction from '~/components/app/elements/previewTrailer'
  import LoaderComponent from '~/components/app/elements/loader'
  import { mapState } from 'vuex'

  export default {
    components: {
      NavigationComponent,
      FilmInfoComponent,
      CinemaScreeningComponent,
      CinemaMapComponent,
      TrailerComponent,
      PreviewTrailerInteraction,
      LoaderComponent
    },
    data () {
      return {
        isMenuShown: false
      }
    },
    computed: {
      ...mapState({
                    mapShown: state => state.ui.mapShown,
                    trailerShown: state => state.ui.trailerShown,
                    filmFetched: state => state.film.request.fetched,
                    filmDescription: state => state.film.description
      })
    },

    created () {
      const url = this.$route.path.replace('/showings/', '')

      this.$store.dispatch('ui/showLoader')

      return this.$store.dispatch('film/getFilmByName', { url })
    },
    methods: {
      toggleMainMenu () {
        this.isMenuShown = !this.isMenuShown
      }
      // displayLocationInfo (position) {
      //   const longitude = position.coords.longitude
      //   const latitude = position.coords.latitude
      //
      //   console.log(`longitude: ${longitude} | latitude: ${latitude}`)
      //
      //   this.$store.dispatch('map/reverseGeocoding', { latitude, longitude })
      // },
      // navigatorErrorCallback (error) {
      //   console.log(`navigatorError: ${error}`)
      //   this.$store.dispatch('ui/showLocationMenu', { error: true })
      //   this.$store.dispatch('ui/hideLoader')
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: stretch;
    position: relative;
    background-image: url('../../assets/icons/background-main.svg');
    background-size: cover;
  }

  .main-menu {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    height: 100%;
    width: 100%;
    z-index: 1000;
    transform: translateY(-100%);
    transition: all 300ms ease-in-out;
  }

  .main-menu--shown {
    transform: translateY(0);
  }

  .main {
    margin: 0 auto;
    position: relative;
    bottom: 0;
    display: flex;
    flex-flow: column nowrap;
    padding: 100px 16px;
    flex: 1;
    max-width: 100%;
  }

  .main-menu__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 32px 40px;
    height: 100%;
  }

  .navigation-links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;

    a {
      text-decoration: none;
      color: #000;
    }
  }

  .main-menu__navigation {
    width: 32px;
    height: 32px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .8;
    cursor: pointer;
    padding: 8px;
    position: absolute;
    right: 12px;
    top: 24px;
    background-image: url('../../assets/icons/navigationIcon.svg');

    &:hover {
      opacity: 1;
    }
  }

  .logo {
    background-size: contain;
    background-position: center;
    background-image: url('../../assets/icons/logo.svg');
    height: 100px;
    width: 100px;
    margin-bottom: 40px;
  }

  .main-menu__navigation--collapsed {
    top: auto;
    bottom: -56px;
    right: 12px;
  }

  .preview-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 40vh;
    position: relative;
    border-radius: 24px;
    box-shadow: 0 0 12px 0px rgba(0, 0, 0, .4);
    order: 1;
  }

  .main__film-cinema {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    background: #fff;
    order: 1;
  }

  .main__film-map {
    display: none;
    transition: all 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950);
    max-width: 100%;
    opacity: 1;
    order: 1;
    z-index: 200;
  }

  .main__film-map--condensed {
    max-width: 0;
    opacity: 0;
  }

  .main__film-info {
    flex: 1;
    max-width: 50%;
    position: relative;
    transition: all 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950);
    order: 2;
  }

  .main__film-info--condensed {
    max-width: 0px;
  }

  .film-info__overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(#FFF9F6, 1);
    transition: all .4s ease-out;
    opacity: 1;
  }

  .film-info__overflow--hidden {
    opacity: 0;
    visibility: hidden;
  }

  @media screen and (min-width: 960px) {
    .main__film-map {
      flex: 1;
      display: flex;
      flex-flow: row nowrap;
    }

    .preview-mobile {
      display: none;
    }

    .main {
      flex-flow: row nowrap;
      padding: 0;
    }

    .preview-image {
      background-position: center;
      position: fixed;
      width: 100%;
      max-width: 50%;
      left: 0;
      top: 0;
      height: 100%;
      transition: all .5s ease-in-out;
      border-radius: 0;
      box-shadow: none;
    }

    .preview-image--expanded {
      max-width: 100%;
      z-index: 1000;
      background-position: center;
      filter: grayscale(100%);
    }

    .main__film-cinema {
      z-index: 100;
    }

    .container {
      height: 100vh;
      max-height: 1300px;
    }

    .main__film-info {
      order: 1;
    }
  }

  @media screen and (min-width: 1500px) {
    .main__film-map--condensed {
      max-width: 50%;
      opacity: 1;
    }

    .preview-image {
      max-width: 33.5%;
    }

    .main__film-info--condensed {
      max-width: 1000px;
    }
  }
</style>
