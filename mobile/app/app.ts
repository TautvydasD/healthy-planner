/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: app/app
*/
import Vue from 'nativescript-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import routes from './routes'
import store from './store'

import sideDrawer from './components/sideDrawer.vue'
import drawerContent from './components/drawerContent.vue'
import RadListView from 'nativescript-ui-listview/vue'
import CalendarView from 'nativescript-ui-calendar/vue'
// import CalendarModule from 'nativescript-ui-calendar'

// Vue.use(CalendarModule)
Vue.use(RadListView)
Vue.use(CalendarView)
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

// Vue.use(Vuex);
Vue.use(VueAxios, axios)

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)
Vue.prototype.$routes = routes


new Vue({
  store,
  // render: h => h('frame', [h(routes.app)])
  // render (h) {
  //   return h(
  //     sideDrawer,
  //     [
  //       h(drawerContent, { slot: 'drawerContent' }),
  //       h(routes.Home, { slot: 'mainContent' })
  //     ]
  //   )
  // }

  render (h) {
    return store.state.token ? 
      h(
        sideDrawer,
        [
          h(drawerContent, { slot: 'drawerContent' }),
          h(routes.Home, { slot: 'mainContent' })
        ]
      ) :
      h('frame', [
        h(routes.login)
      ])
  }
    
  // render: h => h('frame', [
  //     h(store.state.token ? routes.Home : routes.login)
  //   ]
  // )

}).$start()
