<template>
  <div>
    <h1>
      Profile
    </h1>
    <button @click="redirectToFitbit">
      Login to fitbit
    </button>

    <h3>Change account settings</h3>
    <div>
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
        <label for="age">
          Age: 
        </label>
        <input v-model="registerForm.age" type="text">
      </div>
      <div>
        <label for="lastname">
          Gender:
        </label>
        <input v-model="registerForm.sex" type="text">
      </div>
    </div>
    <button>Apply Changes</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fitbitURL: 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22C643&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fprofile&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800',
      accessHeaders: {},
      registerForm: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        sex: ''
      },
      repeated: '',
      isPasswordCovered: true,
      isRepeatedCovered: true,
      failed: false,
      errText: ''
    }
  },
  created () {
    const access = this.$route.hash.replace('#', '')
    console.log(access)
    access.split('&').forEach(el => {
      const vals = el.split('=')
      this.accessHeaders[vals[0]] = vals[1]
      localStorage.setItem(vals[0], vals[1])
    })
    // localStorage.setItem('fitbit', this.accessHeaders)
  },
  methods: {
    redirectToFitbit () {
      window.location.href = this.fitbitURL
    },
    getUser () {
      this.$http.get()
    }
  }
}
</script>
