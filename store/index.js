import Vue from 'vue'
import Vuex from 'vuex'
import appModules from './modules/app'
import adminModules from './modules/admin'
import commonModules from './modules/common'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    ...appModules,
    ...adminModules,
    ...commonModules
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
