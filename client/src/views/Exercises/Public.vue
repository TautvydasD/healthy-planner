<template>
  <div>
    <h1>PopoPlan Database Exercises</h1>
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
            <th>Exercise Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Creation date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(exercise, index) in exercises"
            :key="exercise"
            class="exercise-color"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="exercise.image"
                alt="missing image"
                style="height:60px;background-color:#fff;"
              >
            </td>
            <td>{{ exercise.name }}</td>
            <td>{{ exercise.author }}</td>
            <td>{{ getTime(exercise.createdAt) }}</td>
            <!-- <td>{{ exercise }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div>
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
    </div> -->
    <!-- {{ exercises }} -->
  </div>
</template>

<script>
// import Modal from '../../components/Modal'

export default {
  // components: {
  //   Modal
  // },
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
      this.$http.get('http://192.168.1.11:5000/api/exercises/public').then((res) => {
        console.log()
        this.exercises = res.data.exercises
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
@import './Exercises.scss';
</style>