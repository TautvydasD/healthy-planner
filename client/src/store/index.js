import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    username: null,
    type: null,
    message: null
  },
  mutations: {
    getUser(state) {
      const token = localStorage.getItem('user')
      const user = localStorage.getItem('username')
      if (token) {
        state.token = token
      }
      if (user) {
        state.username = user
      }
    },
    setUser(state, token, username) {
      state.token = token
      state.username = username
      localStorage.setItem('user', token)
      localStorage.setItem('username', username)
    },
    clearUser(state) {
      state.token = null
      state.username = null
      localStorage.removeItem('user')
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
    setUser({ commit }, token, username) {
      commit('setUser', token, username)
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
