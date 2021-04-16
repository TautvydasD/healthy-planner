<template>
  <div>
    <navigation />
    <div class="pages" >
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import '@/components/scss/App';
</style>
