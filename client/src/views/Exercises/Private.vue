<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/Exercises/Private
    */
  -->
  <div>
    <h1>Your own exercises</h1>
    <h3>Your exercises</h3>
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
            <th>Exercise Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Creation date</th>
            <th></th>
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
            <td>
              <button
                @click="handleEdit(exercise, index)"
              >
                Edit
              </button>
              <button
                @click="deleteExercise(exercise['_id'])"
              >
                Delete
              </button>
            </td>
            <!-- <td>{{ exercise }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <button
      @click="openAdd()"
    >
    
      Add your exercise
    </button>

    <modal
      :enabled="isEnabled"
    >
      <button @click="() => isEnabled = !isEnabled">X</button>
      <h3>{{ (isEdit ? 'Edit' : 'Add') + ' Exercise' }}</h3>
      <div>
        <div>
          <label for="name"> Exercise name: </label>
          <input  v-model="exerciseForm.name" type="text" />
        </div>
        <div>
          <label for="description"> Description: </label>
          <input v-model="exerciseForm.description" type="text" />
        </div>
        <div>
          <label for="image"> Image: </label>
          <input  v-model="exerciseForm.image" type="text" />
        </div>
        <div>
          <label for="video"> Video tutorial: </label>
          <input v-model="exerciseForm.tutorial" type="text" />
        </div>
        <div>
          <label for="muscles">Muscle groups: </label>
          <input v-model="exerciseForm.muscleGroup" type="text" />
        </div>
        <div>
          <label for="equipment">Equipment: </label>
          <input v-model="exerciseForm.equipment" type="text" />
        </div>
        <div>
          <label for="exerciseCategory">Exercise Category: </label>
          <input  v-model="exerciseForm.category" type="text">
        </div>
        <div>
          <label for="exerciseCategory">Exercise open to public: </label>
          <input  v-model="exerciseForm.isPrivate" type="checkbox">
        </div>
      </div>
      <button
        @click="isEdit ? editExercise() : addExercise()"
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
      userId: localStorage.getItem('userId'),
      exercises: [],
      exerciseForm: {},
      isEdit: false,
      currIndex: 0,
      currId: '',
      tkey: 0
    }
  },
  created () {
    this.getExercises()
  },
  methods: {
    getExercises () {
      this.$http.get('http://192.168.1.11:5000/api/users/' + this.userId + '/exercises').then(res => {
        this.exercises = res.data.exercises
        // console.log(res)
      })
    },
    getTime (date) {
      const data = new Date(date)
      // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
      return data.toISOString().split('T')[0]
    },
    handleEdit (data, index) {
      this.isEdit = true
      this.isEnabled = !this.isEnabled
      this.exerciseForm = { ...data}
      this.currIndex = index
      this.currId = data['_id']
    },
    openAdd () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      this.exerciseForm = {}
    },
    addExercise () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      const exercise = { ...this.exerciseForm, author: 'tautvis62' }
      console.log(this.exerciseForm)
      this.$http.post('http://192.168.1.11:5000/api/users/' + this.userId + '/exercises', {
        exercises: [ exercise ]
      }).then((res) => {
        this.exercises = res.data.exercises
      })
    },
    editExercise () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      this.$http.put('http://192.168.1.11:5000/api/users/' + this.userId + '/exercises/' + this.currId, {
        exercise: this.exerciseForm
      }).then((res) => {
        this.exercises[this.currIndex] = res.data
        this.tkey = this.tkey + 1
      })
    },
    deleteExercise (data) {
      this.$http.delete('http://192.168.1.11:5000/api/users/' + this.userId + '/exercises/' + data).then(() => {
        this.exercises = this.exercises.filter(el => el['_id'] != data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './Exercises.scss';
div {
  margin-bottom: 10px;
}
</style>