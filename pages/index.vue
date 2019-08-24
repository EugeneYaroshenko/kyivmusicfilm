<template>
  <section class="container">
    <loader-component />
    <navigation-component />
    <div class="main">
      <div :class="{'preview-image': true, 'preview-image--expanded': trailerShown}">
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
        v-if="mapShown"
      >
        <cinema-map-component />
      </div>
    </div>
  </section>
</template>

<script>
  import NavigationComponent from '~/components/navigation'
  import FilmInfoComponent from '~/components/filmInfo'
  import CinemaScreeningComponent from '~/components/cinemaScreening'
  import CinemaMapComponent from '~/components/cinemaMap'
  import TrailerComponent from '~/components/trailer'
  import PreviewTrailerInteraction from '~/components/interactions/previewTrailer'
  import LoaderComponent from '~/components/loader'
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
    computed: {
      ...mapState({
        mapShown: state => state.map.mapShown,
        trailerShown: state => state.trailer.trailerShown
      })
    },
    created () {
      this.$store.dispatch('ui/showLoader')
      this.$store.dispatch('map/getGeolocation')
    },
    methods: {
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
    max-width: 1600px;
    display: flex;
    align-items: stretch;
    position: relative;
  }

  .main {
    margin: 0 auto;
    position: relative;
    bottom: 0;
    display: flex;
    flex-flow: column nowrap;
    padding: 100px 40px;
    flex: 1;
  }

  .preview-image {
    background-image: url('../assets/images/preview__image.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 400px;
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
    flex: 1.6;
    max-width: 100%;
    position: relative;
    transition: all 500ms cubic-bezier(0.445, 0.050, 0.550, 0.950);
    order: 2;
  }

  .main__film-info--condensed {
    max-width: 100px;
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
      flex: 1.6;
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
      background-position: right top;
      background-blend-mode: luminosity;
      position: fixed;
      width: 100%;
      max-width: 62.5%;
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
</style>
