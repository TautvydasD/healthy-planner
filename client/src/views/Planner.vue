<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/Planner
    */
  -->
  <div style="width: 90%; margin: auto">
    <h1>Planner</h1>
    <div style="margin-bottom: 20px">
      <label for="calendarViews">Calendar Views</label>
      <!-- Current Date -->
      <select
        name="calendarViews"
        id="calendarViews"
        v-model="calenderType"
      >
        <option
          v-for="option in calendarOpts"
          :key="option"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
    <template
      v-if="calenderType === 'monthly'"
    >
      <div>
        <div class="month">
          <ul>
            <li class="prev">&#10094;</li>
            <li class="next">&#10095;</li>
            <li>
              August<br />
              <span style="font-size: 18px">2021</span>
            </li>
          </ul>
        </div>

        <ul class="weekdays">
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
          <li>Su</li>
        </ul>

        <ul class="days">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li><span class="active">10</span></li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
        </ul>
      </div>
    </template>
    <template v-else>
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
                <th>Activity name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Activity Length</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(activity, index) in activities"
                :key="activity"
                class="activity-color"
              >
                <td>{{ index + 1 }}</td>
                <!-- <td>
                  <img
                    :src="activity.image"
                    alt="missing image"
                    style="height:60px;background-color:#fff;"
                  >
                </td> -->
                <td>{{ activity.name }}</td>
                <td>{{ activity.category }}</td>
                <td>{{ activity.description }}</td>
                <td>{{ activity.from }} - {{ activity.to }}</td>
                <!-- <td>{{ activity.author }}</td> -->
                <td>{{ activity.createdAt ? activity.createdAt : 'No time specified' }}</td>
                <td>
                  <button
                    @click="handleEdit(activity, index)"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteActivity(activity['_id'])"
                  >
                    Delete
                  </button>
              </td>
                <!-- <td>{{ exercise }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        @click="openAdd()"
      >
        Add Activity
      </button>
      <!-- Adding -->
      <modal
        :enabled="isEnabled"
      >
        <button @click="() => isEnabled = !isEnabled">X</button>
        <div style="text-align: left; margin-top: 20px">
          <h3>{{ (isEdit ? 'Edit' : 'Add') + ' Activity' }}</h3>

          <div>
            <label for="activityName"> Activity Name: </label>
            <input v-model="activityForm.name" type="text" />
          </div>
          <div>
            <label for="activityCategory"> Category: </label>
            <input v-model="activityForm.category" type="text" />
          </div>
          <div>
            <label for="activityDates"> Dates: </label>
            <input v-model="startDate" type="date" />
            -
            <input v-model="endDate" type="date" />
          </div>
          <div>
            <label for="activityTime">Time:</label>
            <input v-model="startTime" style="width:20px;" type="text">
            -
            <input v-model="endTime" style="width:20px;" type="text">
          </div>
          <div>
            <label for="activityDescription"> Description: </label>
            <input v-model="activityForm.description" type="text" />
          </div>
          <!-- <div>
            <label for="activityLocation">Activity: </label>
            <input type="text">
          </div> -->
          <div>
            <button
              @click="isEdit ? editActivity() : addActivity()"
            >
             {{ (isEdit ? 'Edit' : 'Add') + ' Activity' }}
            </button>
          </div>
        </div>
      </modal>
    </template>
  </div>
</template>

<script>
import Modal from '../components/Modal'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isEnabled: false,
      calenderType: 'monthly',
      calendarOpts: [
        { value: 'monthly', name: 'Monthly View' },
        { value: 'daily', name: 'Daily View' },
      ],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      daysInWeek: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      // daysInWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      now: new Date(),
      todayDay: new Date().getDay(),
      todayDate: new Date().getDate(),
      todayMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear(),
      activities: [],
      userId: localStorage.getItem('userId'),
      activityForm: {},
      currId: '',
      currIndex: 0,
      isEdit: false,
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      tkey: 0
    }
  },
  created () {
    this.getActivities()
  },
  computed: {
    activityData () {
      return this.activities
    }
  },
  methods: {
    getActivities () {
      this.$http.get('http://192.168.1.11:5000/api/users/' + this.userId + '/activities').then(res => {
        this.activities = res.data.activities
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
      this.activityForm = { ...data}
      this.currIndex = index
      this.currId = data['_id']
      const splitStart = data.from.split(' ')
      const splitEnd = data.to.split(' ')
      this.startDate = splitStart[0]
      this.startTime = splitStart[1]
      this.endDate = splitEnd[0]
      this.endTime = splitEnd[1]
    },
    openAdd () {
      this.activityForm = {}
      this.isEdit = false
      this.isEnabled = !this.isEnabled
      this.startDate = ''
      this.startTime = ''
      this.endDate = ''
      this.endTime = ''
    },
    addActivity () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      const activity = {
        ...this.activityForm,
        from: this.startDate + ' ' + this.startTime,
        to: this.endDate + ' ' + this.endTime
      }
      console.log(this.activityForm)
      this.$http.post('http://192.168.1.11:5000/api/users/' + this.userId + '/activities', {
        activities: [ activity ]
      }).then((res) => {
        console.log(res)
        this.activities = res.data.activities
        this.tkey = this.tkey + 1
      })
    },
    editActivity () {
      this.isEnabled = !this.isEnabled
      this.isEdit = false
      const activity = {
        ...this.activityForm,
        from: this.startDate + ' ' + this.startTime,
        to: this.endDate + ' ' + this.endTime
      }
      console.log('works')
      this.$http.put('http://192.168.1.11:5000/api/users/' + this.userId + '/activities/' + this.currId, {
        activity: activity
      }).then((res) => {
        console.log('works')
        console.log(res)
        this.activities[this.currIndex] = res.data
        this.tkey = this.tkey + 1
      })
    },
    deleteActivity (data) {
      console.log(data)
      this.$http.delete('http://192.168.1.11:5000/api/users/' + this.userId + '/activities/' + data).then(() => {
        this.activities = this.activities.filter(el => el['_id'] != data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../components/scss/Calendar";
@import "./scss/Planner";
</style>