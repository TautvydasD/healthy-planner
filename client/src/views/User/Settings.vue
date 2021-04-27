<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/User/Settings
    */
  -->
  <div>
    <h1>
      Profile settings
    </h1>
    <div class="fields">
      <div>
        <label for="username">Username:</label>
        <input v-model="user.username" type="text">
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="user.password" type="password">
      </div>
      <div>
        <label for="repeatPassword">Repeat Password:</label>
        <input v-model="user.repeat" type="password">
      </div>
      <div>
        <label for="">Email:</label>
        <input v-model="user.email" type="text">
      </div>
      <div>
        <label for="first">First name:</label>
        <input v-model="user.firstname" type="text">
      </div>
      <div>
        <label for="last">Last name:</label>
        <input v-model="user.lastname" type="text">
      </div>
      <div>
        <label for="age">Age:</label>
        <input v-model="user.age" type="text">
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select v-model="user.gender" name="gender" id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label for="phone">Phone number:</label>
        <input v-model="user.phone" type="text">
      </div>
      <div>
        <label for="profile">Profile Image:</label>
        <input type="file" style="width:180px;">
      </div>
      <button @click="deleteUser()">Remove Account</button>
      <button>Save</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const user = ref('')
    return { user }
  },
  date () {
    return {
      user: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$http.get(`http://192.168.1.11:5000/api/users/${localStorage.getItem('userId')}`).then((res) => {
        console.log('garbage')
        console.log(res)
        this.user = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    deleteUser () {
      this.$http.delete(`http://192.168.1.11:5000/api/users/${localStorage.getItem('userId')}`).then(() => {
        this.$store.dispatch('clearUser').then(() => {
          this.$router.push({ name: 'Home'})
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
  .fields {
    margin: auto;
    width: 300px;
    div {
      display: flex;
      justify-content:space-between;
      margin-bottom: 10px;
    }
  }

  
</style>