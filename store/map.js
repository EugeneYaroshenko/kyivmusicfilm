
function matchUserLocationWithFilmLocation (userCurrentLocation, availableCities) {
  let currentLocation = null
  const userLocation = userCurrentLocation.toLowerCase()

  availableCities.forEach(location => {
    if (userLocation.includes(location.name_eng)) {
      currentLocation = location
    }
  })

  return currentLocation
}

export const state = () => ({
  mapShown: false,
  location: null,
  cinemas: null,
  style: {
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true,
    zoom: 13,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36
          },
          {
            color: '#000000'
          },
          {
            lightness: 40
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on'
          },
          {
            color: '#000000'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          },
          {
            weight: 1.2
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 20
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 21
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 29
          },
          {
            weight: 0.2
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 18
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 16
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 19
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#457cb8'
          }
        ]
      }
    ]
  }
})

export const getters = {}

export const mutations = {
  SHOW_MAP (state) {
    state.mapShown = true
  },
  HIDE_MAP (state) {
    state.mapShown = false
  },
  SELECT_LOCATION (state, location) {
    state.location = location
  }
}

export const actions = {
  showMap ({ commit }) {
    commit('SHOW_MAP')
  },
  hideMap ({ commit }) {
    commit('HIDE_MAP')
  },
  selectLocation ({ commit, dispatch }, location) {
    commit('SELECT_LOCATION', location)
    dispatch('filmDate/saveDatesForLocation', location.name, { root: true })
  },
  async getGeolocation ({ commit, rootState, dispatch }) {
    try {
      const geolocationAPI = 'https://geoip-db.com/json/'
      const location = await this.$axios.$get(geolocationAPI)

      if (location) {
        const userLocationWithFilm = matchUserLocationWithFilmLocation(location.city, rootState.film.location)

        if (userLocationWithFilm) {
          commit('SELECT_LOCATION', userLocationWithFilm)
          dispatch('filmDate/saveDatesForLocation', userLocationWithFilm.name, { root: true })
        } else {
          dispatch('ui/showLocationMenu', { different_location: true }, { root: true })
        }
      } else {
        throw new Error('no location')
      }

      dispatch('ui/hideLoader', {}, { root: true })
    } catch (error) {
      console.log(error, error)
    }
  }
}
