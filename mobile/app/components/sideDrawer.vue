<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/components/sideDrawer
    */
  -->
  <RadSideDrawer ref="drawer" drawerLocation="Left" :gesturedEnabled="gesturedEnabled">
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent"></slot>
    </StackLayout>
    <Frame ~mainContent>
      <slot name="mainContent"></slot>
    </Frame>
  </RadSideDrawer>
</template>

<script>
import sideDrawer from '../mixins/sideDrawer'

export default {
  mixins: [sideDrawer]
}
</script>