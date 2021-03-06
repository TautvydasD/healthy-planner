<template>
  <div>
    <nav>
      <div><img src="health-logo.ico" alt="Brand" /></div>
      <router-link v-for="page in viewPages" :key="page" :to="page.route">
        {{ page.name }}
      </router-link>
      <login></login>
      <sign-up></sign-up>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  components: {
    Login,
    SignUp
  },
  data() {
    return {
      viewPages: [
        { route: "/", name: "Home" },
        { route: "/status", name: "My Status" },
        { route: "/planner", name: "Planner" },
        { route: "/recipes", name: "Recipes" },
        { route: "/about", name: "About" },
        { route: "/profile", name: "Profile" }
      ],
      modalComponents: [
        { route: "/logout", name: "Logout" },
        { route: "/signup", name: "Signup" },
        { route: "/login", name: "Login" }
      ]
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100%;
  div {
    nav {
      display: flex;
      align-content: center;
      justify-content: center;
      background-color: #fff;
      // border-bottom-style: solid;
      // color: #f0bb46;
      // border-color: linear-gradient(160deg, #da714a, #f0bb46);
      // background-image: linear-gradient(160sdeg, #da714a, #f0bb46);
      a {
        color: #da714a;
        padding: 10px;
        text-decoration: none;
        padding: 20px 20px;
        &.router-link-exact-active {
          font-weight: bold;
          color: #f0bb46;
        }
        &:hover:not(.router-link-exact-active) {
          background-color: #f0bb46;
          color: #fff;
        }
      }
      div {
        font-weight: bold;
        color: #da714a;
        // margin: 10px;
        padding: 20px;
        background-image: linear-gradient(160deg, #da714a, #f0bb46);
        img {
          width: 1em;
        }
      }
      div:nth-last-child(2) {
        margin-left: auto;
      }
    }
    div {
      max-width: 80%;
    }
  }
}
</style>
