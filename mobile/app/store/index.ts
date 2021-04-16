import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import { ApplicationSettings } from '@nativescript/core'

import sideDrawer from './modules/sideDrawer'

Vue.use(Vuex);

let debug = process.env.NODE_INV !== 'production'

let store = new Vuex.Store({
  modules: {
    sideDrawer
  },
  strict: debug,
  state: {
    token: null,
    username: null
  },
  mutations: {
    loadFromStorage (state) {
      const storedState: string = ApplicationSettings.getString('token')
      // const username: string = ApplicationSettings.getString('username')
      if (storedState) {
        state.token = JSON.parse(storedState)
      }
      // if (username) {
      //   state.username = JSON.parse(username)
      // }
    },
    setUser(state: any, token: string) {
      state.token = token
      ApplicationSettings.setString('token', JSON.stringify(token))
    },
    // setUsername(state, username: string) {
    //   state.username = username
    //   ApplicationSettings.setString('username', JSON.stringify(username))
    // },
    clearUser(state) {
      state.token = null
      ApplicationSettings.remove('token')
    }
    // clearUsername(state) {
    //   state.username = null
    //   ApplicationSettings.remove('username')
    // }
  },
  actions: {
    setUser({ commit }, token: string) {
      commit('setUser', token)
    },
    // setUsername({ commit }, username: string) {
    //   commit('setUsername', username)
    // },
    clearUser({ commit }) {
      commit('clearUser')
      // commit('clearUsername')
    }
  },
  // getters: {

  // }
})

Vue.prototype.$store = store

export default store