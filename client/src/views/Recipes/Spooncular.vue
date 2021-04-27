<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/Recipes/Spooncular
    */
  -->
  <div>
    <h1>
      Recipes
    </h1>
    <div
      style="width:80%; margin:auto;"
    >
      <table
        style="border-collapse: collapse; width: 100%"
      >
        <thead
          style="width: 100%;"
        >
          <tr
            style="width: 100%; margin: auto;"
          >
            <th></th>
            <th>Food Image</th>
            <th>Name</th>
            <!-- <th>Author</th> -->
            <!-- <th>Creation date</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(recipe, index) in recipes"
            :key="recipe"
            class="exercise-color"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="recipe.image"
                alt="exercise"
                style="height:60px;background-color:#fff;"
              >
            </td>
            <td
              style="margin-left:0px;"
            >
              {{ recipe.title }}
            </td>
            <!-- <td>{{ recipe.license_author }}</td> -->
            <!-- <td>{{ recipe.creation_date }}</td> -->
            <!-- <td>{{ exercise }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div>
      <div v-for="recipe in recipes" :key="recipe">
        <div>{{ recipe.title }}</div>
        <img :src="recipe.image" alt="meal">
        {{ recipe }}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      recipes: []
    }
  },
  created () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      this.$http.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=0d9526c1c8ba461bb3d29c2b20ace171').then(res => {
        console.log(res)
        this.recipes = res.data.results
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Recipes.scss';
</style>

