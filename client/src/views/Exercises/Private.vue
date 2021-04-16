<template>
  <div>
    <h1>Your own exercises</h1>
    <h3>Your exercises</h3>
    <button
      @click="() => isEnabled = !isEnabled"
    >
      Add your exercise
    </button>

    <modal
      :enabled="isEnabled"
    >
    <h3>Add Exercise</h3>
    <div>
      <div>
        <label for="name"> Exercise name: </label>
        <input :onfocus="() => this.value" type="text" />
      </div>
      <div>
        <label for="description"> Description: </label>
        <input type="text" />
      </div>
      <div>
        <label for="image"> Image: </label>
        <input type="text" />
      </div>
      <div>
        <label for="video"> Video tutorial: </label>
        <input type="text" />
      </div>
      <div>
        <label for="muscles">Muscle groups: </label>
        <input type="text" />
      </div>
      <div>
        <label for="equipment">Equipment: </label>
        <input type="text" />
      </div>
      <div>
        <label for="exerciseCategory">Exercise Category: </label>
        <input type="text">
      </div>
    </div>
    <button
      @click="() => isEnabled = !isEnabled"
    >
      Add exercise
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
      isEnabled: false
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  margin-bottom: 10px;
}
</style>