<template>
  <div>
    <h1>Workouts</h1>

    <div>
      <h3>
        Your activities
      </h3>
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
              <th>Workout type</th>
              <th>Reps</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(workout, index) in workouts"
              :key="workout"
              class="exercise-color"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ workout.type }}</td>
              <td>{{ workout.reps ? workout.reps : 'None' }}</td>
              <td>
                <button
                  @click="handleEdit(workout, index)"
                >
                  Edit
                </button>
                <button
                  @click="deleteWorkout(workout['_id'])"
                >
                  Delete
                </button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <button
      @click="openAdd()"
    >
      Add Workout
    </button>

    <modal
     :enabled="isEnabled"
    >
      <button @click="() => isEnabled = !isEnabled">X</button>
      <h3>{{ (isEdit ? 'Edit' : 'Add') + ' Workout' }}</h3>
      <div>
        <label for="type">
          Type:
        </label>
        <input v-model="workoutForm.type" type="text">
      </div>
      <div>
        <label for="reps">
          Reps:
        </label>
        <input v-model="workoutForm.reps" type="text">
      </div>
      <button
        @click="isEdit ? editWorkout() : addWorkout()"
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
      workouts: [],
      workoutForm: {},
      // exercises: [],
      userId: localStorage.getItem('userId'),
      isEdit: false,
      currIndex: 0,
      currId: '',
      tkey: 0
    }
  },
  created () {
    this.getWorkouts()
  },
  methods: {
    getWorkouts () {
      this.$http.get('http://192.168.1.11:5000/api/users/' + this.userId + '/workouts').then((res) => {
        console.log(res)
        this.workouts = res.data.workouts
      })
    },
    handleEdit (data, index) {
      this.isEdit = true
      this.isEnabled = !this.isEnabled
      this.workoutForm = { ...data}
      this.currIndex = index
      this.currId = data['_id']
    },
    openAdd () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      this.workoutForm = {}
    },
    addWorkout () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      const workout = { ...this.workoutForm, author: 'tautvis62' }
      console.log(this.workoutForm)
      this.$http.post('http://192.168.1.11:5000/api/users/' + this.userId + '/workouts', {
        workouts: [ workout ]
      }).then((res) => {
        console.log(res.data.workouts)
        this.workouts = res.data.workouts
        this.tkey = this.tkey + 1
      })
    },
    editWorkout () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      console.log(this.workoutForm)
      this.$http.put('http://192.168.1.11:5000/api/users/' + this.userId + '/workouts/' + this.currId, {
        workout: this.workoutForm
      }).then((res) => {
        console.log(res)
        this.workouts[this.currIndex] = res.data
        this.tkey = this.tkey + 1
      })
    },
    deleteWorkout (data) {
      this.$http.delete('http://192.168.1.11:5000/api/users/' + this.userId + '/workouts/' + data).then(() => {
        this.workouts = this.workouts.filter(el => el['_id'] != data)
      })
    }
  }
}
</script>

<style lang="scss">
  @import './Exercises.scss';
</style>