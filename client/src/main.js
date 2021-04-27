/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: src/main
*/
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'

store.commit('getUser')

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app')
