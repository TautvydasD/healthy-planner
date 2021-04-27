/**
* Author: Tautvydas Dikšas
* Date: 2021-04-26
* Path: app/routes/index
*/
import Login from '../components/Login.vue'
import App from '../components/App.vue'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Exercises from '../views/Activities/Exercises.vue'
import Workouts from '../views/Activities/Workouts.vue'
import Profile from '../views/User/Profile.vue'
// import Planner from '../views/Planner.vue'
import Recipes from '../views/Food/Recipes.vue'
import Meals from '../views/Food/Meals.vue'
import Health from '../views/Health/Health.vue'
import SideDrawer from '../components/sideDrawer.vue'

const routes = {
    login: Login,
    app: App,
    Home: Home,
    About: About,
    Exercises: Exercises,
    Workouts: Workouts,
    Profile: Profile,
    // Planner: Planner,
    Recipes: Recipes,
    Meals: Meals,
    Health: Health,
    SideDrawer: SideDrawer
}

export default routes