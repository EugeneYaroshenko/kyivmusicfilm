<template>
  <div class="cinema-screening">
    <nav>
      <social-icons color="dark" />
      <nuxt-link
        to="/home"
        class="navigation-to"
      >
        Головна
      </nuxt-link>
    </nav>
    <div v-if="locationFetched">
      <div
        class="cinema-content"
        v-if="location"
      >
        <location-selection
          :location="location"
          :locations="locationsWithoutSelected"
          :change-location="changeLocation"
        />
        <h3 class="title">
          {{ filmInformation.name }}
        </h3>
        <div class="screening-block">
          <h3 class="screening-block__title">
            Сеанси у кіно
          </h3>
          <calendar
            :dates="showingDates"
            :select-showing="selectShowing"
            :selected-date="selectedShowingDate"
          />
        </div>
        <div
          class="screening-block"
          v-if="cinemas"
        >
          <h3 class="screening-block__title">
            Придбати квиток
          </h3>
          <cinemas
            :cinemas="cinemas"
          />
        </div>
        <control-navigation
          :map-shown="mapShown"
          :on-action="toggleMap"
        />
        <description
          :film-information="filmInformation"
        />
      </div>
      <div v-else>
        <locations
          :locations="allLocations"
          :select-location="changeLocation"
        />
      </div>
    </div>
    <div
      class="loader-container"
      v-if="locationLoading"
    >
      <div class="loader" />
    </div>
    <div />
  </div>
</template>

<script>
  import LocationSelection from '~/modules/app/components/cinemas/locationSelection'
  import Cinemas from '~/modules/app/components/cinemas/cinemasList'
  import ControlNavigation from '~/modules/app/components/cinemas/control'
  import Calendar from '~/modules/app/components/cinemas/calendar'
  import Locations from '~/modules/app/components/cinemas/locations'
  import Description from '~/modules/app/components/cinemas/description'
  import SocialIcons from '~/modules/app/components/socialIcons'
  import { mapState } from 'vuex'

  export default {
    components: {
      Calendar,
      Locations,
      Description,
      LocationSelection,
      Cinemas,
      ControlNavigation,
      SocialIcons
    },
    methods: {
      toggleMap () {
        if (this.mapShown) {
          this.$store.dispatch('ui/hideMap')
        } else {
          this.$store.dispatch('ui/showMap')
        }
      },
      changeLocation (location) {
        this.$store.dispatch('map/selectLocation', location)
      },
      selectShowing (date) {
        this.$store.dispatch('filmShowings/selectShowing', { date })
      }
    },
    computed: {
      ...mapState({
                    mapShown: state => state.ui.mapShown,
                    location: state => state.map.location,
                    locationFetched: state => state.map.request.fetched,
                    locationLoading: state => state.map.request.loading,
                    allLocations: state => state.film.showings.locations,
                    filmInformation: state => state.film.description,
                    cinemas: state => state.filmShowings.selectedShowingCinemas,
                    showingDates: state => state.filmShowings.allActualDates,
                    selectedShowingDate: state => state.filmShowings.selectedShowingDate
                  }),
      locationsWithoutSelected () {
        if (this.allLocations) {
          return this.location ? this.allLocations.filter(locationItem => locationItem.name !== this.location.name) : this.allLocations
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/partials/variables';

  .cinema-screening {
    position: relative;
    min-height: 100vh;
  }

  nav {
    display: none;
    top: 4px;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;

    .navigation-to {
      position: absolute;
      right: 16px;
      top: 20px;
      text-decoration: none;
      font-size: .9em;
      color: $blue;
    }
  }

  .cinema-content {
    padding: 12px 8px 12px;
    width: 100%;
  }

  .title {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 600;
    padding: 0 8px;
    margin: 36px 0 0;
  }

  .screening-block {
    margin: 3em auto 0em;
    max-width: 80%;
  }

  .screening-block__title {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: .5px;
    text-align: center;
    font-size: 1.2em;
  }

  .loader-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .loader {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: 5px solid #000;
      border-top-color: transparent;
      border-bottom-color: transparent;
      animation: loading 1s linear infinite;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    @keyframes loading {
      from {
        transform: rotate(0deg)
      }
      to {
        transform: rotate(359deg)
      }
    }
  }

  @media screen and (min-width: 960px) {
    .cinema-screening {
      flex: 1.2;
      padding: 24px 32px 0px 24px;
      overflow: hidden;
    }

    .title {
      margin: 48px 0 0;
    }

    .cinema-content {
      padding: 40px 16px 12px;
    }

    nav {
      position: absolute;
      display: block;
    }
  }
</style>
