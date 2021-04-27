<template>
    <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/Recipes/Private
    */
  -->
  <div>
    <h1>
      My recipes
    </h1>
    <h3>Your recipes</h3>
    <div
      style="width:80%; margin:auto;"
    >
      <table
        style="border-collapse: collapse; width: 100%"
        :key="tkey"
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
            <th></th>
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
                alt="missing image"
                style="height:60px;background-color:#fff;"
              >
            </td>
            <td>{{ recipe.name }}</td>
            <td>{{ recipe.author }}</td>
            <td>{{ getTime(recipe.createdAt) }}</td>
            <td>
              <button
                @click="handleEdit(recipe, index)"
              >
                Edit
              </button>
              <button
                @click="deleteRecipe(recipe['_id'])"
              >
                Delete
              </button>
            </td>
            <!-- <td>{{ exercise }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <h3>Add your recipe</h3>
    <button
      @click="openAdd()"
    >
      Add
    </button>

    <!-- adding -->
    <modal
     :enabled="isEnabled"
    >
      <button @click="() => isEnabled = !isEnabled">X</button>
      <h3>{{ (isEdit ? 'Edit' : 'Add') + ' Recipe' }}</h3>
      <div>
        <label for="name">
          Name:
        </label>
        <input v-model="recipeForm.name" type="text">
      </div>
      <div>
        <label for="category">
          Category:
        </label>
        <input v-model="recipeForm.category" type="text">
      </div>
      <div>
        <label for="image">
          Image:
        </label>
        <input v-model="recipeForm.image" type="text">
      </div>
      <div>
        <label for="tutorial">
          Tutorial:
        </label>
        <input v-model="recipeForm.tutorial" type="text">
      </div>
      <div>
        <label for="ingredients">
          Ingredients
        </label>
        <input v-model="recipeForm.ingredients" type="text">
      </div>
      <div>
        <label for="calories">
          Calories:
        </label>
        <input v-model="recipeForm.calories" type="text">
      </div>
      <div>
        <label for="private">
          Post Private:
        </label>
        <input v-model="recipeForm.isPrivate" type="checkbox">
      </div>
      <button
        @click="isEdit ? editRecipe() : addRecipe()"
      >
        {{ (isEdit ? 'Edit' : 'Add') + ' exercise' }}
      </button>
    </modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      isEnabled: false,
      recipeForm: {},
      recipes: [],
      userId: localStorage.getItem('userId'),
      isEdit: false,
      currIndex: 0,
      currId: '',
      tkey: 0
    }
  },
  created () {
    this.getRecipes()
  },
  methods: {
    getRecipes () {
      this.$http.get('http://192.168.1.11:5000/api/users/' + this.userId + '/recipes').then((res) => {
        this.recipes = res.data.recipes
      })
    },
    getTime (date) {
      if (date) {
        const data = new Date(date)
        // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
        return data.toISOString().split('T')[0]
      }
      return 'No date'
    },
    handleEdit (data, index) {
      this.isEdit = true
      this.isEnabled = !this.isEnabled
      this.recipeForm = { ...data}
      this.currIndex = index
      this.currId = data['_id']
    },
    openAdd () {
      this.isEnabled = !this.isEnabled
      this.recipeForm = {}
      this.isEdit = false
    },
    addRecipe () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      const recipe = { ...this.recipeForm, author: 'tautvis62' }
      console.log(this.recipeForm)
      this.$http.post('http://192.168.1.11:5000/api/users/' + this.userId + '/recipes', {
        recipes: [ recipe ]
      }).then((res) => {
        this.recipes = res.data.recipes
      })
    },
    editRecipe () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      this.$http.put('http://192.168.1.11:5000/api/users/' + this.userId + '/recipes/' + this.currId, {
        recipe: this.recipeForm
      }).then((res) => {
        this.recipes[this.currIndex] = res.data
        this.tkey = this.tkey + 1
      })
    },
    deleteRecipe (data) {
      this.$http.delete('http://192.168.1.11:5000/api/users/' + this.userId + '/recipes/' + data).then(() => {
        this.recipes = this.recipes.filter(el => el['_id'] != data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Recipes.scss';
</style>