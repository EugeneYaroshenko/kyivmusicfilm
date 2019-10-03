<template>
  <div :class="{ 'location-container': true, 'location-container--is-expanded': true }">
    <div :class="{ 'location-component': true, 'location-component--is-expanded': true }">
      <div class="cities-select">
        <h3>Обери місто для перегляду: </h3>
      </div>
    </div>
    <div
      class="cities-list__container"
    >
      <ul
        class="cities-list"
        v-if="allLocations"
      >
        <li
          v-for="(location) in allLocations"
          :key="location.name"
          class="city-item"
          @click="selectLocation(location)"
        >
          <span class="city-item__city">
            {{ capitalize(location.UI_NAME) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import Close from '~/assets/icons/vueIcons/close'
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        allLocations: state => state.film.showings.locations,
        selectedLocation: state => state.map.location,
        locationMenuType: state => state.ui.locationMenuType
      }),
      locationText () {
        switch (this.locationMenuType) {
          case 'ERROR_TYPE':
            return 'Обери одне з міст, де ти хочеш переглянути фільм:'
          case 'DIFFERENT_LOCATION_TYPE':
            return 'Обери місто, де ти бажаєш переглянути фільм:'
          default:
            return 'Сеанси в іншому місті:'
        }
      }
    },
    methods: {
      expandLocation () {
        this.$store.dispatch('ui/showLocationMenu')
      },
      minimizeLocation () {
        this.$store.dispatch('ui/hideLocationMenu')
      },
      selectLocation (location) {
        this.$store.dispatch('map/selectLocation', location)
        this.$store.dispatch('ui/hideLocationMenu')
      },
      capitalize (text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
      }
    },
    components: {
      Icon,
      Close
    }
  }
</script>

<style lang="scss" scoped>
  .location-icon {
    margin-right: 4px;
    display: flex;
  }

  .expand-component {
    position: absolute;
    z-index: 200;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .location-city {
    font-weight: 500;
    font-size: 1.2em;
    letter-spacing: 2px;
    color: #57575e;
  }

  .location-container {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    align-items: flex-end;
    z-index: 500;
    background-color: #fff;
    transition: all .4s ease-in-out;
  }

  .location-container--is-expanded {
    height: 100%;
    position: fixed;
  }

  .location-component {
    letter-spacing: 1px;
    width: 100%;
    padding: 40px 8px 4px 8px;
    position: relative;
  }

  .location-component--is-expanded {
    padding-top: 64px;
  }

  .current-location {
    padding: 4px 8px 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    border-bottom: 2px solid #57575e;
    max-width: 100px;
    margin: 0 auto;
  }

  .current-location--is-expanded {
    border-bottom: 4px solid #57575e;
    font-size: 1.5em;
    margin-bottom: 32px;
  }

  .cities-list__container {
    width: 100%;
  }

  .cities-list {
    list-style: none;
    padding: 12px 18px 24px;
    overflow-y: scroll;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 100%;
    margin: 0;

    .city-item {
      padding: 16px 12px 16px 12px;
      flex: 1;
      min-width: 50%;
      max-width: 50%;
      margin-bottom: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all .4s ease-in-out;
      border-radius: 4px;
      font-size: 1.2em;
      opacity: .7;
      font-weight: 400;

      &:hover {
        opacity: 1;
      }
    }

    .city-item__location {
      fill: grey;
      margin-right: 8px;
    }

    .city-item__city {
      font-size: 1.3em;
    }
  }

  .close-icon {
    position: absolute;
    top: 40px;
    right: 40px;
    cursor: pointer;
    display: none;
    z-index: 200;
  }

  .close-icon--shown {
    display: block;
  }

  .cities-select {
    display: none;
    text-align: center;
    margin: 40px auto 16px;
  }

  .location-container--is-expanded .cities-select {
    display: block;
  }

  @media screen and (min-width: 960px) {
    .location-container {
      background-color: #fff;
    }

    .location-container--is-expanded {
      background-color: #FFF;
      position: absolute;
    }
  }

</style>
