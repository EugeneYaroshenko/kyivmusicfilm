<template>
  <div class="map" v-if="location">
    <GmapMap
      :center="location.position"
      :options="mapStyle"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :icon.sync="m.icon"
        @click="showInfoWindow(m)"
      />
      <GmapInfoWindow
        :opened="infoWindowShown"
        :options="infoWindowOptions"
        :position="markerPosition"
        @closeclick="closeInfoWindow"
      >
        <div v-html="infoWindowContent" />
      </GmapInfoWindow>
    </GmapMap>
  </div>
</template>

<script>
  import MarkerIcon from '../../assets/icons/marker.png'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        infoWindowShown: false,
        markerPosition: null,
        infoWindowOptions: {
          pixelOffset: {
            width: 0,
            height: -45
          }
        },
        infoWindowContent: null,
        markers: null
      }
    },
    watch: {
      location: function (val, oldVal) {
        if (val && val.name !== oldVal.name) {
          this.setMarkers()
        }
      }
    },
    mounted () {
      this.setMarkers()
    },
    computed: {
      ...mapState({
        location: state => state.map.location,
        mapStyle: state => state.map.style,
        // GETTER FOR CURRENT CITY
        allCinemas: state => state.film.cinema
      }),
    },
    methods: {
      setMarkers () {
        console.log('here', this.location)
        const cinemas = this.allCinemas.filter(cityCinemas => cityCinemas.location === this.location.name)

        this.markers = cinemas[0].cinema_array.map(cinema => {
          return {
            position: cinema.position,
            title: JSON.stringify({ title: cinema.name, address: cinema.address })
          }
        })
      },
      showInfoWindow (data) {
        this.markerPosition = data.position
        this.setInfoWindowContent(JSON.parse(data.title))
        this.infoWindowShown = true
      },
      closeInfoWindow () {
        this.infoWindowShown = false
      },
      setInfoWindowContent (content) {
        this.infoWindowContent = `<div class="info-content">
            <h4 class="info-content__title">${content.title}</h4>
            <div class="info-content__address"> ${content.address}</div>
         </div>`
      }
    }
  }
</script>

<style>
  .cinema-map {
    flex: 1;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .info-content {
    padding: 12px 4px 2px;
  }

  .info-content__title {
    letter-spacing: 1px;
    margin-top: 0;
    text-transform: uppercase;
  }

  .info-content__address {
    font-size: .9em;
  }
</style>
