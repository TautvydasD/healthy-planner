import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: () =>
      import(/* webpackChunkName: "recipes" */ "../views/Recipes.vue")
  },
  {
    path: "/status",
    name: "Status",
    component: () =>
      import(/* webpackChunkName: "status" */ "../views/Status.vue")
  },
  {
    path: "/planner",
    name: "Planner",
    component: () =>
      import(/* webpackChunkName: "planner" */ "../views/Planner.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
