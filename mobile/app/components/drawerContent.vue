<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/components/drawerContent
    */
  -->
  <GridLayout
    rows="auto, *"
    class="nt-drawer__content"
  >
    <StackLayout
      row="0"
      class="nt-drawer__header"
    >
        <Image
          class="nt-drawer__header-image fas t-36"
          src.decode="font://&#xf2bd;"
        />
        <Label
          class="nt-drawer__header-brand"
          text="User Name"
        />
        <Label
          class="nt-drawer__header-footnote"
          text="username@mail.com"
        />
    </StackLayout>
    <ScrollView
      row="1"
      height="100%"
    >
      <StackLayout
        width="100%"
      >
        <!-- <Label
          class="drawer-header"
          text="Drawer"
        /> -->
        
        <Label
          v-for="(page, i) in pages"
          @tap="goToPage(page.component)"
          class="drawer-item"
          :text="page.name"
          :key="i"
        />
        <Button class="drawer-close-button" @tap="logout()">Log out</Button>
        <Button class="drawer-close-button" @tap="closeDrawer()">Close Drawer</Button>
      </StackLayout>
    </ScrollView>
  </GridLayout>
</template>

<script>
import sideDrawer from '../mixins/sideDrawer'

export default {
  mixins: [sideDrawer],
  data () {
    return {
      pages: [
        { name: 'Home', component: this.$routes.Home },
        { name: 'Health', component: this.$routes.Health },
        // { name: 'Meal Plans', component: this.$routes.Meals },
        { name: 'Recipes', component: this.$routes.Recipes },
        { name: 'Workouts', component: this.$routes.Workouts },
        { name: 'Exercises', component: this.$routes.Exercises },
        { name: 'About', component: this.$routes.About }
      ]
    }
  },
  methods: {
    goToPage (pageComponent) {
      this.$navigateTo(pageComponent)
      this.closeDrawer()
    },
    logout () {
      this.$store.commit('clearUser')
      this.closeDrawer()
      this.$navigateTo(this.$routes.login, {
        clearHistory: true
      })
    },
  }
}
</script>