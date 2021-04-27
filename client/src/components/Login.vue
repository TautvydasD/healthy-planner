<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/components/Login
    */
  -->
  <div>
    <button
      class="user-button"
      @click="() => isFormEnabled = !isFormEnabled"
    >
      Login
    </button>
    <modal
      :enabled="isFormEnabled"
    >
      <h1>login</h1>
      <div>
        <div>
          <label for="username">Username: </label>
          <input
            v-model="loginForm.username"
            name="username"
            type="text"
          >
        </div>
      </div>
      <div>
        <div>
          <label for="password">Password: </label>
          <input
            v-model="loginForm.password"
            name="password"
            :type="isPasswordCovered ? 'password' : 'text'"
          >
        </div>
        <button @click="() => isPasswordCovered = !isPasswordCovered">See</button>
      </div>
      <div
      v-if="failed"
      style="color:red;"
      >
        {{ errText }}
      </div>
      <div>
        <input type="checkbox">
        <label for="checkbox">Remember me</label>
      </div>
      <div>
        <a href="">Forgot Password</a>
      </div>
      <div>
        <button @click="login">Login</button>
        <button>Register</button>
      </div>
      <div>
        ______________________
      </div>
      <div>
        Login with
      </div>
      <!-- <google-login
        :params="params"
        :logoutButton="true"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      /> -->
      <!-- <g-sign-in-button/> -->

    </modal>
  </div>
</template>

<script>
import Modal from './Modal'
// import GoogleSignInButton from 'vue-google-signin-button-directive'
// import GoogleLogin from 'vue-google-login'
// import GSignInButton from '../components/GSignInButton'
// import GSignInButton from '../components/GSignInButton.vue'
export default {
  components: {
    Modal
  // GSignInButton
  // GSignInButton
  //   GoogleLogin
  },
  data () {
    return {
      isFormEnabled: false,
      loginForm: {
        username: '',
        password: ''
      },
      isPasswordCovered: true,
      failed: false,
      errText: '',
      // params: {
      //   client_id: '911266563350-10dsvrj4315ul9gag15gconbst5647og' // eslint-disable-line
      // },
      renderParams: {
        width: 250,
        heigth: 50,
        longtitle: true
      }
    }
  },
  mounted () {
    // var modal = document.querySelector('#modal')
    // var modalOverlay = document.querySelector('#modal-overlay')
    // var closeButton = document.querySelector('#close-button')
    // var openButton = document.querySelector('#open-button')

    // closeButton.addEventListener('click', () => {
    //   modal.classList.toggle('closed')
    //   modalOverlay.classList.toggle('closed')
    // })

    // openButton.addEventListener('click', () => {
    //   modal.classList.toggle('closed')
    //   modalOverlay.classList.toggle('closed')
    // })
  },
  methods: {
    login () {
      this.errText = ''
      this.$http.post('http://192.168.1.11:5000/api/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then((res) => {
        console.log(res)
        console.log(res.data.userId)
        console.log(this.loginForm.username)
        this.$store.dispatch('setUser', {
          token: 'kek',
          userId: res.data.userId,
          username: this.loginForm.username
        }).then(() => {
          this.isFormEnabled = !this.isFormEnabled
        })
      }).catch((err) => {
        this.failed = true
        if (err.response.status === 401) {
          this.errText = err.response.data.error
        }
      })
    },
    // onSignIn (googleUser) {
    //   var profile = googleUser.getBasicProfile()
    //   console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
    //   console.log('Name: ' + profile.getName())
    //   console.log('Image URL: ' + profile.getImageUrl())
    //   console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
    // },
    // onSignIn (user) {
    //   const profile = user.getBasicProfile()
    // },
    // OnGoogleAuthSuccess (idToken) {
    //   // Receive the idToken and make your magic with the backend
    // },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
    onSuccess () {

    },
    onFailure () {

    }
  },
}
</script>

<style lang="scss" scoped>
@import './scss/Login';
@import './scss/UserForm';
</style>