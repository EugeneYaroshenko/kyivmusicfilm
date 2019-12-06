<template>
  <div class="map-container">
    <div class="map" v-if="location">
      <GmapMap
        :center="mapCenter"
        ref="mapRef"
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
          :opened="infoWindowShown || infoWindowToggled"
          :options="infoWindowOptions"
          :position="markerPosition"
          @closeclick="closeInfoWindow"
        >
          <div v-html="infoWindowContent" />
        </GmapInfoWindow>
      </GmapMap>
    </div>
    <div class="map-preview" v-else/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      clickMarkerEvent: {
        type: Function,
        required: false,
        default: () => []
      }
    },
    data () {
      return {
        infoWindowShown: false,
        infoWindowToggled: false,
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
      selectedDate: function (val, oldVal) {
        if (val && val !== oldVal) {
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
        selectedDate: state => state.filmShowings.selectedShowingDate,
        // GETTER FOR CURRENT CITY
        cinemas: state => state.filmShowings.selectedShowingCinemas
      }),
      mapCenter () {
        if (this.markers && this.markers.length) {
          return this.markers[0].position
        } else {
          return this.location.position
        }
      },
    },
    methods: {
      setMarkers () {
        if (this.cinemas) {
          this.markers = this.cinemas.map(cinema => {
            return {
              position: cinema.position,
              title: JSON.stringify({ title: cinema.name, address: cinema.address }),
              icon: {
                url: require('../../../../assets/icons/markerIcon.png'),
                size: { width: 44, height: 60.34, f: 'px', b: 'px' },
                scaledSize: { width: 40, height: 55, f: 'px', b: 'px' }
              }
            }
          })
        }
      },
      showInfoWindow (data) {
        this.markerPosition = data.position
        this.setInfoWindowContent(JSON.parse(data.title))
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.panTo({ lat: data.position.lat, lng: data.position.lng })
          map.setZoom(13)
        })
        this.infoWindowShown = true
        this.clickMarkerEvent()
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

  .map-container {
    height: 100%;
    width: 100%;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .map-preview {
    height: 100%;
    width: 100%;
    background-image: url('../../../../assets/images/map.png');
    background-size: cover;
    background-position: left center;
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
