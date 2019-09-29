import * as types from '@/store/mutationTypes'

const state = () => ({
  cinemas: null,
  locations: null,
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {
  getAllCinemasForLocation: (state) => (city) => {
    const cinemas = state.cinemas.filter(cinemaItem => cinemaItem.location === city)[0].cinema_array
    return cinemas
  }
}

const mutations = {
  [types.GET_DATA_REQUEST] (state) {
    state.cinemas = null
    state.locations = null
    state.request = { ...state.request, fetched: false, loading: true }
  },
  [types.GET_DATA_SUCCESS] (state, data) {
    state.cinemas = data.cinemas
    state.locations = data.locations
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.GET_DATA_ERROR] (state, payload) {
    state.request = { ...state.request, fetched: false, loading: false, error: payload.error }
  },
}

const actions = {
  async getData ({ commit }) {
    console.log('HEEERE')
    commit(types.GET_DATA_REQUEST)

    try {
      const data = await this.$axios.$get('/api/data')

      commit(types.GET_DATA_SUCCESS, data)
    } catch (error) {
      commit(types.GET_DATA_ERROR, error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
