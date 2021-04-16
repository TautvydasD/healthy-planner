<template>
  <div ref="signinBtn" class="g-signin2" @click="onSignIn">Sign In</div>
</template>

<script>
export default {
  mounted () {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.init({
        client_id: '911266563350-10dsvrj4315ul9gag15gconbst5647og.apps.googleusercontent.com', // eslint-disable-line
        cookiepolicy: 'single_host_origin'
      })
      auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
        this.$emit('done', googleUser)
      }, error => console.log(error))
    })
  },
  methods: {
    onSignIn (user) {
      console.log(user)
    }
  }
}
</script>