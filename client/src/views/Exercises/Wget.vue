<template>
  <div>
    <h1>
      Exercises
    </h1>
    <br>
    <label for="PerPageAmount">Show per page</label>
    <select v name="limits" id="limits">
      <option v-for="amount in perPageAmounts" :key="amount" value="amount">
        {{ amount }}
      </option>
    </select>
    <div v-for="exercise in exercises" :key="exercise">
      {{ exercise.name }}
      <img style="width:100px;100px;" :src="exercise.image" alt="exercise">
    </div>
    <!-- {{ exercises }} -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      exercises: [],
      perPageAmounts: [10, 20, 50, 100],
      perPage: 10
    }
  },
  created () {
    this.getExercises()
  },
  methods: {
    getExercises() {
      this.$http.get('https://wger.de/api/v2/exercise/?language=2&limit=227').then(({ data }) => {
        this.$http.get('https://wger.de/api/v2/exerciseimage/?limit=227').then((res) => {
          console.log(data)
          console.log(res.data)
          data.results.forEach(el => {
            res.data.results.forEach(el1 => {
              if (el.id === el1.exercise) {
                el.image = el1.image
                this.exercises.push(el)
              }
            })
          })
        })
      })
    }
  }
}
</script>