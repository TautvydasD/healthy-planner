<template>
  <div>
    <h1>
      Recipes
    </h1>
    test
    <div>
      <div v-for="recipe in recipes" :key="recipe">
        <div>{{ recipe.title }}</div>
        <img :src="recipe.image" alt="meal">
        {{ recipe }}
      </div>
    </div>
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

