import * as types from '@/store/mutationTypes'

const state = () => ({
  loggedIn: false,
  request: {
    loading: false,
    fetched: false,
    error: null
  }
})

const getters = {
}

const mutations = {
  [types.USER_LOGIN_REQUEST] (state) {
    state.loggedIn = false
    state.request = { ...state.request, fetched: false, loading: true, error: null }
  },
  [types.USER_LOGIN_SUCCESS] (state) {
    state.loggedIn = true
    state.request = { ...state.request, fetched: true, loading: false }
  },
  [types.USER_LOGIN_ERROR] (state) {
    state.loggedIn = false
    state.request = { ...state.request, fetched: false, loading: false, error: true }
  }
}

const actions = {
  async loginUser ({ commit }, authData) {
    commit(types.USER_LOGIN_REQUEST)
    try {
      const loginRequest = await this.$axios.$post('/api/auth/login', authData)

      commit(types.USER_LOGIN_SUCCESS)
    } catch (error) {
      commit(types.USER_LOGIN_ERROR, error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
