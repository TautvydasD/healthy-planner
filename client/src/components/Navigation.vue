<template>
  <nav>
    <div><img src="health-logo.ico" alt="PopoPlan" /></div>
    <div
      v-for="page in allowedPages"
      :key="page"
      :class="{ dropdown: page.hasChild }"
    >
      <template v-if="page.hasChild">
        <router-link :to="page.route">
          {{ page.name }}
        </router-link>
        <div class="dropdown-content">
          <router-link
            v-for="childPage in allowedChildPages[page.route]"
            :key="childPage"
            :to="childPage.route"
          >
            {{ childPage.name }}
          </router-link>
        </div>
      </template>
      <router-link v-else :to="page.route">
          {{ page.name }}
      </router-link>
    </div>
    <template v-if="$store.state.token">
      <logout />
    </template>
    <template v-else>
      <login />
      <sign-up />
    </template>
  </nav>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import Logout from './Logout'

export default {
  components: {
    Login,
    SignUp,
    Logout
  },
  data() {
    return {
      allPages: [
        { route: '/', name: 'Home' },
        { route: '/planner', name: 'Planner', isUserSpecific: true },
        { route: '/health', name: 'Health', hasChild: true },
        { route: '/recipes', name: 'Recipes', hasChild: true },
        { route: '/exercises', name: 'Exercises', hasChild: true },
        { route: '/workouts', name: 'Workouts' },
        { route: '/about', name: 'About' },
        { route: '/profile', name: 'Profile', hasChild: true, isUserSpecific: true },
      ],
      childRoutes: {
        '/health': [
          { route: '/health/progress', name: 'Progress', isUserSpecific: true },
          { route: '/health/status', name: 'Status', isUserSpecific: true },
          { route: '/health/focus', name: 'Focus' },
          { route: '/health/sleep', name: 'Sleep', isUserSpecific: true }

        ],
        '/exercises': [
          { route: '/exercises/public', name: 'popoPlan' },
          { route: '/exercises/wget', name: 'wGet' },
          { route: '/exercises/private', name: 'My exercises', isUserSpecific: true }
        ],
        '/recipes': [
          { route: '/recipes/public', name: 'popoPlan'},
          { route: '/recipes/spooncular', name: 'Spooncular' },
          { route: '/recipes/private', name: 'My recipes', isUserSpecific: true }
        ],
        '/profile': [
          { route: '/profile/settings', name:'Settings', isUserSpecific: true }
        ]
      }
    }
  },
  computed: {
    allowedPages () {
      let pageArr = []
      if (this.$store.state.token) {
        pageArr = this.allPages
      } else {
        pageArr = this.allPages.filter(page => !page.isUserSpecific)
      }
      return pageArr
    },
    allowedChildPages () {
      const pageArr = {}
      for (const [key, value] of Object.entries(this.childRoutes)) {
        if (this.$store.state.token) {
          pageArr[key] = value
        } else {
          pageArr[key] = value.filter(page => !page.isUserSpecific)
        }
      }
      return pageArr
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/Navigation.scss';
</style>