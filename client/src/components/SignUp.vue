<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/components/SignUp
    */
  -->
  <div>
    <button
      class="user-button"
      @click="() => isEnabled = !isEnabled"
    >
      Sign Up
    </button>
    <modal
      :enabled="isEnabled"
    >
      <h1>
        Register
      </h1>
      <div>
        <label for="username">
          Username:
        </label>
        <input v-model="registerForm.username" type="text">
      </div>
      <div>
        <label for="password">
          Password:
        </label>
        <input v-model="registerForm.password" :type="isPasswordCovered ? 'password' : 'text'">
        <button @click="() => isPasswordCovered = !isPasswordCovered">See</button>
      </div>
      <div>
        <label for="repeated">
          Repeat Password:
        </label>
        <input v-model="repeated" :type="isRepeatedCovered ? 'password' : 'text'">
        <button @click="uncoverPassword">See</button>
      </div>
      <div>
        <label for="email">
          Email:
        </label>
        <input v-model="registerForm.email" type="text">
      </div>
      <div>
        <label for="firstname">
          First Name:
        </label>
        <input v-model="registerForm.firstname" type="text">
      </div>
      <div>
        <label for="lastname">
          Last Name:
        </label>
        <input v-model="registerForm.lastname" type="text">
      </div>
      <div>
        <button @click="sendRegister">Register</button>
      </div>

    </modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      isEnabled: false,
      registerForm: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        age: ''
      },
      repeated: '',
      isPasswordCovered: true,
      isRepeatedCovered: true,
      failed: false,
      errText: ''
    }
  },
  methods: {
    sendRegister () {
      console.log('nice try')
      this.$http.post('http://192.168.1.11:5000/api/signup', {
        username: this.registerForm.username,
        password: this.registerForm.password,
        email: this.registerForm.email,
        firstName: this.registerForm.firstName,
        lastName: this.registerForm.lastName
      }).then(res => {
        console.log(res)
        this.$store.dispatch('setUser', 'kek', this.registerForm.username).then(() => {
          this.isEnabled = false
        })
      }).catch(err => {
        this.failed = true
        if (err.response.status === 401) {
          this.errText = err.response.data.error
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import './scss/SignUp';
@import './scss/UserForm';
</style>
