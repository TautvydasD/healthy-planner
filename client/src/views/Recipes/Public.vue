<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/Recipes/Public
    */
  -->
  <div>
    <h1>
      PopoPlan database recipes
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
            <th>Recipe Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(recipe, index) in recipes"
            :key="recipe"
            class="recipe-color"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="recipe.image"
                alt="missing image"
                style="height:60px;background-color:#fff;"
              >
            </td>
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.author }}</td>
            <td>{{ getTime(recipe.createdAt) }}</td>
            <!-- <td>{{ exercise }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEnabled: false,
      recipes: []
    }
  },
  created () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      this.$http.get('http://192.168.1.11:5000/api/recipes/public').then((res) => {
        console.log(res)
        this.recipes = res.data.recipes
      })
    },
    getTime (date) {
      const data = new Date(date)
      // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
      return data.toISOString().split('T')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Recipes.scss';
</style>