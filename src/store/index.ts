import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * initial state
 */
const state = {
  user: {},
  accessToken: '',
  googleapisLocation: {long: 0, lat: 0},
  googleapisRadius: 0
}

/**
 * getters to access the store state 
 */
const getters = {
  user: state => state.user,
  accessToken: state => state.accessToken,
  googleapisLocation: state => state.googleapisLocation,
  googleapisRadius: state => state.googleapisRadius
}

/**
 * actions to change the state 
 */
const mutations = {
  setUser: (state, payload) => { state.user = payload },
  setAccessToken: (state, payload) => { state.accessToken = payload },
  setGoogleapisLocation: (state, payload) => { state.googleapisLocation = payload },
  setGoogleapisRadius: (state, payload) => { state.googleapisRadius = payload * 1609.34 }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})

