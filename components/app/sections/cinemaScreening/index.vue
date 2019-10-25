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
      <h3 class="title">
        {{ filmInformation.name }}
      </h3>
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
        class="control left-control"
        :class="{'hidden-control': !mapShown}"
      >
        <div
          class="play-icon"
          @click="toggleMap"
        >
          <icon
            view-box="0 0 34.93 44.33"
            size="54"
            icon-name="play"
          >
            <play-button />
          </icon>
        </div>
      </div>
      <div
        class="control right-control"
        :class="{'hidden-control': mapShown}"
      >
        <div
          class="toggle-icon"
          @click="toggleMap"
        >
          <icon
            view-box="0 0 196.5 279.2"
            size="54"
            icon-name="map"
          >
            <map-icon />
          </icon>
        </div>
      </div>
      <description
        :film-information="filmInformation"
      />
    </div>
    <div v-else>
      <location-component />
    </div>
  </div>
</template>

<script>
  import CalendarComponent from '~/components/app/elements/calendar'
  import LocationComponent from '~/components/app/elements/location'
  import Description from '~/modules/app/components/description'
  import VueSelect from '~/components/select/select'
  import VueOption from '~/components/select/option'
  import Icon from '~/components/app/elements/icon'
  import MapIcon from '~/assets/icons/vueIcons/map'
  import PlayButton from '~/assets/icons/vueIcons/playButton'
  import { mapState } from 'vuex'

  export default {
    components: {
      CalendarComponent,
      LocationComponent,
      Icon,
      MapIcon,
      PlayButton,
      VueSelect,
      VueOption,
      Description
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
    font-weight: 300;
    padding: 0 8px;
    margin: 64px 0 30px;
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
    height: auto;
    min-height: 100px;
    transition: all 350ms ease-in-out;
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

  .control {
    position: absolute;
    bottom: 0;
    max-height: 200px;
    cursor: pointer;
    display: none;
    overflow: hidden;
    transition: all 350ms ease-in-out;
    z-index: 200;
  }

  .hidden-control {
    max-height: 0;
  }

  .right-control {
    right: 0;
    background-color: rgba(#000000, 1);
    box-shadow: 0 3px 6px 0px rgba(#000, 1);
    border-radius: 0px 0 0px 0;

    .toggle-icon {
      fill: #ffffff;
      transition: all 350ms ease-in-out;
    }

    &:hover .toggle-icon {
      fill: #03B2FF;
    }
  }

  .left-control {
    left: 0;
    background-color: rgba(#000000, 1);
    border-radius: 0 0px 0px 0;
    box-shadow: 1px -3px 6px 0px rgba(#000000, .6);

    .play-icon {
      svg {
        stroke: #ffffff;
        transition: all 350ms ease-in-out;
      }
    }

    &:hover .play-icon svg {
      stroke: #03B2FF;
    }
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -6px;
    padding: 24px 8px 12px 12px;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 12px 18px 8px;
  }

  .locations-selection {
    position: relative;
    max-width: 200px;
    margin: 0 auto 16px;
    z-index: 100;

    .locations-selection__block {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

  @media screen and (min-width: 960px) {
    .control {
      display: block;
    }

    .cinemas {
      max-height: 200px;
      overflow-y: scroll;
    }

    .cinema-screening {
      flex: 1.2;
      padding: 4px 32px 12px 24px;
    }
  }

  @media screen and (min-width: 1500px) {
    .control {
      display: none;
    }
  }
</style>
