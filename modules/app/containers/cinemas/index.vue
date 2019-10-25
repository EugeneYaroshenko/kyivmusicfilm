<template>
  <div class="cinema-screening">
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
          Обрати кінотеатр
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
</template>

<script>
  import LocationSelection from '~/modules/app/components/cinemas/locationSelection'
  import Cinemas from '~/modules/app/components/cinemas/cinemasList'
  import ControlNavigation from '~/modules/app/components/cinemas/control'
  import Calendar from '~/modules/app/components/cinemas/calendar'
  import Locations from '~/modules/app/components/cinemas/locations'
  import Description from '~/modules/app/components/cinemas/description'
  import { mapState } from 'vuex'

  export default {
    components: {
      Calendar,
      Locations,
      Description,
      LocationSelection,
      Cinemas,
      ControlNavigation
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
  .cinema-screening {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .cinema-content {
    padding: 32px 16px 12px;
  }

  .title {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 600;
    padding: 0 8px;
    margin: 48px 0 0;
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

  @media screen and (min-width: 960px) {
    .cinema-screening {
      flex: 1.2;
      padding: 24px 32px 0px 24px;
    }
  }
</style>
