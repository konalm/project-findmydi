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
  googleapisRadius: 0,

  inductionInfo: {
    id: '', 
    hourly_rate: 0, 
    avatar_url: '', 
    intro_read: false, 
    offer: '',
    adi_licence_no: '',
    adi_licence_verification: '',
    coverages: []
  }
}

/**
 * getters to access the store state 
 */
const getters = {
  user: state => state.user,
  accessToken: state => state.accessToken,
  googleapisLocation: state => state.googleapisLocation,
  googleapisRadius: state => state.googleapisRadius,
  inductionInfo: state => state.inductionInfo
}

/**
 * actions to mutate the state 
 */
const mutations = {
  setUser: (state, payload) => { state.user = payload },
  setAccessToken: (state, payload) => { state.accessToken = payload },
  setGoogleapisLocation: (state, payload) => { state.googleapisLocation = payload },
  setGoogleapisRadius: (state, payload) => { state.googleapisRadius = payload * 1609.34 },
  setInductionInfo: (state, payload) => { state.inductionInfo = payload }
}


export default new Vuex.Store({
  state,
  getters,
  mutations
})

