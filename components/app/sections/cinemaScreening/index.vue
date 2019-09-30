<template>
  <div class="cinema-screening">
    <!--<location-component />-->
    <div class="locations-selection">
      <div class="locations-selection__block">
        <vue-select
          :data="locationsWithoutSelected"
          @change="changeLocation"
          :placeholder="location.UI_NAME"
          v-if="location"
        >
          <vue-option
            v-for="(otherLocation, index) in locationsWithoutSelected"
            :key="index"
            :value="otherLocation"
            :label="otherLocation.UI_NAME"
          />
        </vue-select>
      </div>
    </div>
    <h3 class="title">
      {{ filmInformation.name }}
    </h3>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Сеанси
      </h4>
      <calendar-component/>
    </div>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Кінотеатри
      </h4>
      <div
        class="cinemas"
        v-if="cinemas"
      >
        <div
          class="cinema"
          v-for="(cinema, index) in cinemas"
          :key="index"
        >
          <div class="cinema-name">
            {{ cinema.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="map-control">
      <div
        class="toggle-icon"
        @click="toggleMap"
      >
        <icon
          view-box="0 0 447.65 585.2"
          size="70"
          icon-name="map"
        >
          <map-icon/>
        </icon>
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarComponent from '~/components/app/elements/calendar'
  import LocationComponent from '~/components/app/elements/location'
  import VueSelect from '~/components/select/select'
  import VueOption from '~/components/select/option'
  import Icon from '~/components/app/elements/icon'
  import MapIcon from '~/assets/icons/vueIcons/map'
  import {mapState} from 'vuex'

  export default {
    components: {
      CalendarComponent,
      LocationComponent,
      Icon,
      MapIcon,
      VueSelect,
      VueOption
    },
    methods: {
      toggleMap() {
        if (this.mapShown) {
          this.$store.dispatch('ui/hideMap')
        } else {
          this.$store.dispatch('ui/showMap')
        }
      },
      locationsWithoutSelected() {
        if (this.allLocations) {
          return this.location ? this.allLocations.filter(locationItem => locationItem.name !== this.location.name) : this.allLocations
        }
      },
      changeLocation(location) {
        this.$store.dispatch('map/selectLocation', location.value)
      }
    },
    computed: {
      ...mapState({
                    mapShown: state => state.ui.mapShown,
                    loaderShown: state => state.ui.loading,
                    location: state => state.map.location,
                    allLocations: state => state.film.showings.locations,
                    filmInformation: state => state.film.description,
                    cinemas: state => state.filmShowings.selectedShowingCinemas
                  })
    }
  }
</script>

<style lang="scss">
  .cinema-screening {
    flex: 1;
    padding: 32px 16px 12px;
    position: relative;
  }

  .title {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 600;
    margin: 54px 0 2em 0;
  }

  .screening-block {
    margin: 0 auto 2em;
    max-width: 80%;
  }

  .screening-block__title {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: .5px;
    text-align: center;
  }

  .cinemas {
    margin-top: 16px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .cinema {
    padding: 8px 12px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    transition: all .2s ease-in-out;
    cursor: pointer;
    font-size: .8em;
    text-align: center;
    color: #06A4FF;

    &:hover {
      color: darken(#06A4FF, 20%);
    }

  }

  .cinema-name {
    text-transform: uppercase;
    font-weight: 600;
  }

  .time {
    font-size: 0.8em;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    max-width: 60%;
  }

  .time-item {
    padding: 0 4px;
  }

  .map-control {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: rgba(#333333, 1);
    padding: 24px 0 0 2px;
    box-shadow: 0 3px 6px 0px rgba(#000, 1);
    cursor: pointer;
    display: none;
    overflow: hidden;
    border-radius: 24px 0 0 0;
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -6px;
  }

  .locations-selection {
    position: relative;
    max-width: 300px;
    margin: 0 auto 16px;

    .locations-selection__block {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

  @media screen and (min-width: 960px) {
    .map-control {
      display: block;
    }

    .cinema-screening {
      flex: 1.2;
      padding: 40px 32px 12px 24px;
    }
  }
</style>
