<template>
  <div>
    <h1>PopoPlan Database Exercises</h1>

    <div>
      <div v-for="ex in exercises" :key="ex">
        <div @click="() => isEnabled = !isEnabled">
          {{ ex.name }}
        </div>
        <modal
          :enabled="isEnabled"
        >
          <h1>{{ ex.name }}</h1>
          <div>
            {{ ex.author }}
          </div>
          <div>
            {{ ex.category }}
          </div>
          <div>
            <img v-if="ex.image" src="ex.image" alt="Exercise pic">
          </div>
          <div>
            <p>
              {{ ex.description }}
            </p>
          </div>
          <button @click="() => isEnabled = !isEnabled">Close</button>
        </modal>
      </div>
    </div>
    <!-- {{ exercises }} -->
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
      exercises: []
    }
  },
  created () {
    this.getExercises()
  },
  methods: {
    getExercises () {
      this.$http.get('http://localhost:5000/api/exercises/public').then((res) => {
        this.exercises = res.data.exercises
      })
    }
  }
}
</script>