<template>
  <div class="cinema-screening">
    <div
      class="cinema-content"
      v-if="location"
    >
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
      <h2 class="title">
        {{ filmInformation.name }}
      </h2>
      <div class="screening-block">
        <h3 class="screening-block__title">
          Сеанси у кіно
        </h3>
        <calendar-component />
      </div>
      <div class="screening-block">
        <div
          class="cinemas"
          v-if="cinemas"
        >
          <div
            class="cinema"
            v-for="(cinema, index) in cinemas"
            :key="index"
          >
            <div
              class="cinema-name active-link"
              v-if="cinema.url"
            >
              <a
                :href="cinema.url"
                target="_blank"
              >
                {{ cinema.name }}
              </a>
            </div>
            <div
              class="cinema-name"
              v-else
            >
              {{ cinema.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="map-control left-control"
        :class="{'hidden-control': !mapShown}"
      >
        <div
          class="play-icon"
          @click="toggleMap"
        >
          <icon
            view-box="0 0 24 26.48"
            size="50"
            icon-name="map"
          >
            <play-icon />
          </icon>
        </div>
      </div>
      <div
        class="map-control right-control"
        :class="{'hidden-control': mapShown}"
      >
        <div
          class="toggle-icon"
          @click="toggleMap"
        >
          <icon
            view-box="0 0 447.65 585.2"
            size="70"
            icon-name="map"
          >
            <map-icon />
          </icon>
        </div>
      </div>
    </div>
    <div v-else>
      <location-component />
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
  import PlayIcon from '~/assets/icons/vueIcons/playIcon'
  import { mapState } from 'vuex'

  export default {
    components: {
      CalendarComponent,
      LocationComponent,
      Icon,
      MapIcon,
      PlayIcon,
      VueSelect,
      VueOption
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

<style lang="scss">
  .cinema-screening {
    flex: 1;
    position: relative;
  }

  .cinema-content {
    padding: 32px 16px 12px;
  }

  .title {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    font-weight: 300;
    margin: 64px 0;
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
    font-size: 1.2em;
  }

  .cinemas {
    margin-top: 16px;
    max-height: 200px;
    overflow-y: scroll;
  }

  .cinema {
    padding: 8px 12px;
    margin-bottom: 4px;
    transition: all .2s ease-in-out;
    cursor: default;
    font-size: 1.2em;
    text-align: center;
  }

  .cinema-name {
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: .2px;
    opacity: .6;
    pointer-events: none;
    color: #0001BF;

    &:hover {
      color: rgb(0, 1, 255);
    }
  }

  .active-link {
    opacity: 1;
    pointer-events: auto;
    cursor: pointer;

    a {
      color: inherit;
      text-decoration: none;
    }
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
    max-height: 200px;
    cursor: pointer;
    display: none;
    overflow: hidden;
    transition: all 350ms ease-in-out;
  }

  .hidden-control {
    max-height: 0;
  }

  .right-control {
    right: 0;
    background-color: rgba(#333333, 1);
    box-shadow: 0 3px 6px 0px rgba(#000, 1);
    border-radius: 24px 0 0px 0;
  }

  .left-control {
    left: 0;
    background-color: #0000FF;
    border-radius: 0 40px 0px 0;
    box-shadow: 1px -3px 6px 0px rgba(#0000FF, .6);
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -6px;
    padding: 24px 0 0 2px;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 12px 12px 8px;
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

  @media screen and (min-width: 1500px) {
    .map-control {
      display: none;
    }
  }
</style>
