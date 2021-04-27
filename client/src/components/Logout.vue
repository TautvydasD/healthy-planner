<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/components/Logout
    */
  -->
  <div>
    <button
      class="user-button"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('clearUser').then(() => {
        this.$router.push({ name: 'Home'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/UserForm';
</style>