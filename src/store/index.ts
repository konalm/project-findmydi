import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * initial state
 */
const state = {
  user: {},
  accessToken: ''
}

/**
 * getters to access the store state 
 */
const getters = {
  user: state => state.user,
  accessToken: state => state.accessToken
}

/**
 * actions to change the state 
 */
const mutations = {
  setUser: (state, payload) => { state.user = payload },
  setAccessToken: (state, payload) => { state.accessToken = payload }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})

