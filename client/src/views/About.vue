<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/About
    */
  -->
  <div class="about">
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    <h1>Who is this for?</h1>
    <p>{{ whom }}</p>
    <h1>Why should you use it?</h1>
    <p>Goal of this planner is convenience. {{ goal }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whom: 'Healthy time planner is for people who strive\
      with strict schedule.',
      goal: 'The System is built to be all-in-one,\
      so a person would not have to have\
      multiple apps installed and check through them at the same time.'
    }
  },
  methods: {
    onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      const profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // The ID token you need to pass to your backend:
      const idToken = googleUser.getAuthResponse().id_token
      console.log('ID Token: ' + idToken)
    }
  }
}
</script>
