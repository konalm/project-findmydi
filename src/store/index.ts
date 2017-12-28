import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * initial state
 */
const state = {
  user: {}
}

/**
 * getters to access the store state 
 */
const getters = {
  user: state => state.user
}

/**
 * actions to change the state 
 */
const mutations = {
  setUser: (state, payload) => {
    state.user = payload
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})

