<template>
  <div class="cinema-screening">
    <location-component />
    <h3 class="title">
      Геніальний Кутюр'є
    </h3>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Сеанси
      </h4>
      <calendar-component />
    </div>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Кінотеатри
      </h4>
      <div
        class="cinemas"
        v-if="dateCinemas"
      >
        <div
          class="cinema"
          v-for="(cinema, index) in dateCinemas.cinema_array"
          :key="index"
        >
          <div class="cinema-name">
            {{ cinema }}
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
          view-box="0 0 14.67 22.4"
          size="36"
          icon-name="map"
        >
          <map-icon />
        </icon>
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarComponent from '~/components/calendar'
  import LocationComponent from '~/components/location'
  import Icon from '~/components/icon'
  import MapIcon from '~/assets/icons/vueIcons/map'
  import { mapState } from 'vuex'

  export default {
    components: {
      CalendarComponent,
      LocationComponent,
      Icon,
      MapIcon
    },
    methods: {
      toggleMap () {
        if (this.mapShown) {
          this.$store.dispatch('map/hideMap')
        } else {
          this.$store.dispatch('map/showMap')
        }
      }
    },
    computed: {
      ...mapState({
        mapShown: state => state.map.mapShown,
        loaderShown: state => state.ui.loading,
        location: state => state.map.location
                  }),
      dateCinemas () {
        return this.$store.state.filmDate.selectedDate
      },
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
    padding: 16px 8px 12px 16px;
    box-shadow: 0 3px 6px 0px rgba(#C8D7D4, 1);
    cursor: pointer;
    display: none;
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
