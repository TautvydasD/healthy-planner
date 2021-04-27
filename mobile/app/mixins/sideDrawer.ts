/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: app/mixins/sideDrawer
*/
export default {
  date () {
    return {
      gesturesEnabled: true
    }
  },
  computed: {
    drawerElement () {
      return (this.$refs && this.$refs.drawer) || null
    },
    drawer: {
      get () {
        return this.$store.getters.sideDrawer
      },
      set (v) {
        return this.$store.commit('setSideDrawer', v)
      }
    }
  },
  watch: {
    drawer (v) {
      if (this.drawerElement) {
        return v ?
          this.drawerElement.nativeView.showDrawer() :
          this.drawerElement.nativeView.closeDrawer()
      }
    }
  },
  methods: {
    openDrawer () {
      this.drawer = true
    },
    closeDrawer () {
      this.drawer = false
    }
  }
}