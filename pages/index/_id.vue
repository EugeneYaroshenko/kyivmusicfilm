<template>
  <section
    class="container"
  >
    <div
      class="main"
      ref="main"
    >
      <!--<trailer-component v-if="trailerShown" />-->
      <!--<div class="preview-mobile">-->
      <!--<preview-trailer-interaction />-->
      <!--</div>-->
      <div
        class="main__film-info"
        ref="filmInfo"
      >
        <div
          class="film-image"
          :style="{ backgroundImage: 'url(' + filmDescription.image_desktop + ')' }"
        />
        <div
          class="trailer-container"
          ref="trailerContainer"
        >
          <trailer
            :show-trailer="showTrailer"
            :hide-trailer="hideTrailer"
            :trailer="film.description.trailer"
          />
        </div>
      </div>
      <div class="main__film-cinema">
        <cinemas />
      </div>
      <trailer-mobile
        class="trailer-mobile"
        :trailer="film.description.trailer"
      />
      <div class="main__film-map">
        <cinema-map-component />
      </div>
    </div>
  </section>
</template>

<script>
  import Cinemas from '~/modules/app/containers/cinemas'
  import CinemaMapComponent from '~/components/app/sections/cinemaMap'
  import Trailer from '~/modules/app/components/trailer'
  import TrailerMobile from '~/modules/app/components/trailer/trailerMobile'
  import { mapState } from 'vuex'
  import TimelineMax from 'gsap/umd/TimelineMax'
  import TimelineLite from 'gsap/umd/TimelineLite'
  import EasePack from 'gsap/umd/EasePack'
  import TweenMax from 'gsap/umd/TweenMax'

  export default {
    scrollToTop: true,
    components: {
      Cinemas,
      CinemaMapComponent,
      Trailer,
      TrailerMobile
    },
    watch: {
      mapShown: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          return newValue ? this.showMap() : this.hideMap()
        }
      }
    },
    computed: {
      ...mapState({
                    mapShown: state => state.ui.mapShown,
                    trailerShown: state => state.ui.trailerShown,
                    filmDescription: state => state.film.description,
                    film: state => state.film
                  })
    },
    // created () {
    //   this.$store.dispatch('ui/showLoader')
    // },
    mounted () {
      if (this.film && this.film.showings) {
        this.$store.dispatch('map/getGeolocation', this.film.showings.locations, { root: true })
      }
    },
    methods: {
      showTrailer () {
        const t = new TimelineMax()

        t.add(TweenMax.set(this.$refs.filmInfo, { overflow: 'visible' }))

        t.add(TweenMax.to(
          this.$refs.trailerContainer,
          0.6,
          {
            maxHeight: '100vh',
            maxWidth: '100vw',
            ease: EasePack.Sine.easeOut
          }
        ))
      },

      hideTrailer () {
        const t = new TimelineMax()

        t.add(TweenMax.to(
          this.$refs.trailerContainer,
          0.6,
          {
            maxWidth: '40vw',
            ease: EasePack.Sine.easeIn
          }
        ).delay(0.2))

        t.add(TweenMax.set(this.$refs.filmInfo, { overflow: 'hidden' }))
      },
      showMap () {
        const t = new TimelineMax()

        t.add(TweenMax.to(
          this.$refs.trailerContainer,
          0.2,
          {
            transform: 'translate3d(0, -8%, 0)',
            ease: EasePack.Sine.easeOut
          },
          'first'
        ))

        t.add(TweenMax.set(this.$refs.main, { overflow: 'visible' }))

        t.add(TweenMax.to(
          this.$refs.trailerContainer,
          1,
          {
            transform: 'translate3d(0, 100%, 0)',
            opacity: 0,
            ease: EasePack.Sine.easeOut
          }
        ), 'animation-transition')

        t.add(TweenMax.to(
          this.$refs.main,
          0.3,
          {
            transform: 'translate3d(-40%, 0, 0)',
            ease: EasePack.Sine.easeOut
          }
        ), 'animation-transition')
      },
      hideMap () {
        const t = new TimelineMax()

        t.add(TweenMax.to(
          this.$refs.main,
          0.35,
          {
            transform: 'translate3d(0, 0, 0)',
            ease: EasePack.Sine.easeIn
          }
        ))

        t.add(TweenMax.to(
          this.$refs.trailerContainer,
          0.5,
          {
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
            ease: EasePack.Sine.easeOut
          },
          'animation-transition'
        ))

        t.add(TweenMax.set(this.$refs.main, { overflow: 'hidden' }))
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
    width: 100%;
  }

  .main {
    margin: 0 auto;
    position: relative;
    bottom: 0;
    display: flex;
    flex-flow: column nowrap;
    padding: 54px 0 32px;
    flex: 1;
    width: 100%;
    overflow: hidden;
    transition: all 350ms ease-out;
  }

  .film-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .main__film-cinema {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    order: 1;
  }

  .main__film-map {
    display: none;
    max-width: 100%;
    opacity: 1;
    z-index: 200;
    order: 3;
  }

  .trailer-container {
    display: none;
  }

  .main__film-info {
    flex: 1;
    max-width: 100%;
    height: 300px;
    position: relative;
    z-index: 1000;
    overflow: hidden;
    order: 3;
  }

  .trailer-mobile {
    margin: 0px 0 24px;
    min-height: 300px;
    display: block;
    order: 2;
  }

  @media screen and (min-width: 960px) {
    .trailer-container {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      height: 100vh;
      width: 100vw;
      max-width: 40vw;
      margin: auto 0;
      left: 0;
    }

    .main__film-info {
      display: block;
      max-width: 40%;
      height: 100%;
      order: 1;
    }
    .main__film-map {
      min-width: 40%;
      width: 40%;
      display: flex;
      flex-flow: row nowrap;
      order: 3;
    }

    .trailer-mobile {
      display: none;
    }

    .main {
      padding: 0;
      flex-flow: row nowrap;
    }

    .film-image {
      background-position: center;
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }

    .main__film-cinema {
      z-index: 100;
      min-width: 60%;
      width: 60%;
      order: 2;
    }

    .container {
      height: 100vh;
    }

    .main__film-info {
      width: 40%;
      min-width: 40%;
    }
  }

  @media screen and (min-width: 1500px) {
    .trailer-container {
      max-width: 35vw;
    }

    .main__film-info {
      width: 35%;
      min-width: 35%;
      max-width: 35%;
    }

    .film-image {
      background-position: right center;
    }

    .main__film-cinema {
      z-index: 100;
      min-width: 40%;
      width: 40%;
    }

    .main__film-map {
      min-width: 25%;
      width: 25%;
    }

  }
</style>
