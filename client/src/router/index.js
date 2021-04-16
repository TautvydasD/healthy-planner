import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/planner',
    name: 'Planner',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "planner" */ '../views/Planner.vue')
    
  },
  {
    path: '/health',
    redirect: store.state.token ? { name: 'Progress' } : { name: 'Focus' }
  },
  {
    path: '/health/progress',
    name: 'Progress',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "progress" */ '../views/Health/Progress.vue')
  },
  {
    path: '/health/status',
    name: 'Status',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "status" */ '../views/Health/Status.vue')
  },
  {
    path: '/health/focus',
    name: 'Focus',
    component: () =>
      import(/* webpackChunkName: "focus" */ '../views/Health/Focus.vue')
  },
  {
    path: '/health/sleep',
    name: 'Sleep',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "sleep" */ '../views/Health/Sleep.vue')
  },
  {
    path: '/recipes',
    redirect: { name: 'publicRecipes' }
  },
  {
    path: '/recipes/spooncular',
    name: 'Spooncular',
    component: () =>
      import(/* webpackChunkName: "spooncular" */ '../views/Recipes/Spooncular.vue')
  },
  {
    path: '/recipes/public',
    name: 'publicRecipes',
    component: () =>
      import(/* webpackChunkName: "publicRecipes" */ '../views/Recipes/Public.vue')
  },
  {
    path: '/recipes/private',
    name: 'privateRecipes',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "privateRecipes" */ '../views/Recipes/Private.vue')
  },
  {
    path: '/exercises',
    redirect: { name: 'publicExercises' }
  },
  {
    path: '/exercises/wget',
    name: 'wGet',
    component: () =>
      import(/* webpackChunkName: "wget" */ '../views/Exercises/Wget.vue')
  },
  {
    path: '/exercises/public',
    name: 'publicExercises',
    component: () =>
      import(/* webpackChunkName: "publicExercises" */ '../views/Exercises/Public.vue')
  },
  {
    path: '/exercises/private',
    name: 'privateExercises',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "privateExercises" */ '../views/Exercises/Private.vue')
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: () =>
      import(/* webpackChunkName: "workouts" */ '../views/Exercises/Workouts.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/User/Profile.vue')
  },
  {
    path: '/profile/settings',
    name: 'Settings',
    beforeEnter: CheckLogin,
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/User/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function CheckLogin (to, from, next) {
  if (store.state.token) {
    next() 
  } 
  else {
    next('/')
  } 
}

export default router
