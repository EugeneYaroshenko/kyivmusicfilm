<template>
  <div class="cinema-map">
    <div class="location-container">
      <div class="location-component">
        <div class="location-icon">
          <icon
            view-box="0 0 27.051 27.051"
            size="24"
            icon-name="location"
            class="location-icon"
          >
            <location />
          </icon>
        </div>
        <div class="location-city">
          Київ
        </div>
      </div>
    </div>
    <div class="map">
      <GmapMap
        :center="{lat:50.4395699, lng:30.5158215}"
        :options="mapStyle"
        style="width: 100%; height: 100%"
      >
      </GmapMap>
    </div>
  </div>
</template>

<script>
  import Icon from '../../components/icon'
  import Location from '../../assets/icons/vueIcons/location'

  export default {
    data () {
      return {
        mapStyle: {
          disableDefaultUI: true,
          scaleControl: true,
          zoomControl: true,
          zoom: 13,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [
                {
                  weight: '2.00'
                }
              ]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [
                {
                  color: '#9c9c9c'
                }
              ]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [
                {
                  visibility: 'on'
                }
              ]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [
                {
                  color: '#f2f2f2'
                }
              ]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [
                {
                  saturation: -100
                },
                {
                  lightness: 45
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#eeeeee'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#7b7b7b'
                }
              ]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'simplified'
                }
              ]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [
                {
                  visibility: 'off'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [
                {
                  color: '#46bcec'
                },
                {
                  visibility: 'on'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#c8d7d4'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#070707'
                }
              ]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#ffffff'
                }
              ]
            }
          ]
        }
      }
    },
    components: {
      Icon,
      Location
    }
  }
</script>

<style>
  .location-icon {
    margin-right: 4px;
    display: flex;
  }

  .location-city {
    font-weight: 600;
    font-size: 1em;
  }

  .cinema-map {
    padding: 24px 0 12px 32px;
    flex: 1;
  }

  .location-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .location-component {
    cursor: pointer;
    letter-spacing: 1px;
    padding: 8px 4px 8px 16px;
    display: flex;
    align-items: center;
  }

  .map {
    width: 100%;
    height: 400px;
  }
</style>
