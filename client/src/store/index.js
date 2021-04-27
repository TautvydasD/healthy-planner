/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: src/store/index
*/
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    username: null,
    userId: null,
    type: null,
    message: null
  },
  mutations: {
    getUser(state) {
      const user = localStorage.getItem('username')
      const token = localStorage.getItem('user')
      const userId = localStorage.getItem('userId')
      if (token) {
        state.token = token
      }
      if (user) {
        state.username = user
      }
      if (userId) {
        state.userId = userId
      }
    },
    setUser(state, message) {
      state.token = message.token
      state.userId = message.userId
      state.username = message.username
      localStorage.setItem('user', message.token)
      localStorage.setItem('userId', message.userId)
      localStorage.setItem('username', message.username)
    },
    clearUser(state) {
      state.token = null
      state.userId = null
      state.username = null
      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      localStorage.removeItem('username')
    },
    success(state, message) {
      state.type = 'alert-success'
      state.message = message
    },
    error(state, message) {
      state.type = 'alert-danger'
      state.message = message
    },
    clear(state) {
      state.type = null
      state.message = null
    }
  },
  actions: {
    setUser({ commit }, message) {
      commit('setUser', message)
    },
    clearUser({ commit }) {
      commit('clearUser')
    },
    success({ commit }, message) {
      commit('success', message)
    },
    error({ commit }, message) {
      commit('error', message)
    },
    clear({ commit }) {
      commit('clear')
    }
  },
  modules: {}
})
