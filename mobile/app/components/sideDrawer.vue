<template>
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