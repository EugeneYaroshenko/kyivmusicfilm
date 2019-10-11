<template>
  <section class="container">
    <loader-component />
    <navigation-component :map-shown="mapShown" />
    <div
      class="main"
      v-if="filmDescription"
    >
      <div
        class="preview-image"
        :class="{'preview-image--hidden': mapShown, 'preview-image--expanded': trailerShown}"
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
  import NavigationComponent from '~/modules/app/components/navigation'
  import FilmInfoComponent from '~/components/app/elements/filmInfo'
  import CinemaScreeningComponent from '~/components/app/sections//cinemaScreening'
  import CinemaMapComponent from '~/components/app/sections/cinemaMap'
  import TrailerComponent from '~/components/app/sections/trailer'
  import PreviewTrailerInteraction from '~/components/app/elements/previewTrailer'
  import LoaderComponent from '~/components/app/elements/loader'
  import { mapState } from 'vuex'

  export default {
    async asyncData ({ route, store }) {
      const url = route.path.replace('/', '')

      try {
        const film = url.length ? await store.dispatch('film/getFilmByName', { url }) : null
        return {
          film
        }
      } catch (e) {
        console.log(e)
      }
    },
    head () {
      if (this.film) {
        return {
          meta: [
            { property: 'og:url', content: `${process.env.baseUrl}/${this.film.description.url}` },
            { hid: 'og:title', name: 'og:title', content: `${this.film.description.name}` },
            { property: 'og:description', content: `${this.film.description.description_short}` },
            { property: 'og:image', content: this.film.description.image_mobile },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:type', content: 'image/png' }
          ]
        }
      }
    },
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
                    mapShown: state => state.ui.mapShown,
                    trailerShown: state => state.ui.trailerShown,
                    filmDescription: state => state.film.description
                  })
    },
    created () {
      this.$store.dispatch('ui/showLoader')
    },
    mounted () {
      if (this.film && this.film.showings) {
        this.$store.dispatch('map/getGeolocation', this.film.showings.locations, { root: true })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: stretch;
    position: relative;
    background-image: url('../../assets/icons/background-main.svg');
    background-attachment: fixed;
    background-size: cover;
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

  .preview-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 60vh;
    position: relative;
    border-radius: 24px;
    box-shadow: 0 0 12px 0px rgba(0, 0, 0, .4);
    order: 1;
  }

  .main__film-cinema {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
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
    display: none;
  }

  .main__film-info--condensed {
    max-width: 0px;
    overflow: hidden;
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
    .main__film-info {
      display: block;
    }
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

    .preview-image--hidden {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    .preview-image--expanded {
      max-width: 100%;
      z-index: 1000;
      background-position: center;
      opacity: 1;
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
