<template>
  <div>
    <h1>
      My recipes
    </h1>
    <h3>Your recipes</h3>
    {{  }}
    <h3>Add your recipes</h3>
    <button>Add</button>
    <modal
     :enabled="isEnabled"
    >
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
      <button>Add</button>
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
      recipeForm: {
        name: '',
        category: '',
        image: '',
        tutorial: '',
        calories: '',
        ingredients: '',
        isPrivate: true
      }
    }
  }
}
</script>