<template>
  <div style="width: 90%; margin: auto">
    <h1>Planner</h1>
    <div style="margin-bottom: 20px">
      <label for="calendarViews">Calendar Views</label>
      Current Date
      <select name="calendarViews" id="calendarViews">
        <option
          v-for="option in calendarOpts"
          :key="option"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
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
    <div>
      <h3>
        Your activities
      </h3>

      <ul>
        <li>
          Test
          <button>
            Edit
          </button>
          <button>
            Delete
          </button>
        </li>
      </ul>

    </div>

    <div style="text-align: left; margin-top: 20px">
      <h3>Add Activity</h3>

      <div>
        <label for="activityName"> Activity Name: </label>
        <input type="text" />
      </div>
      <div>
        <label for="activityCategory"> Category: </label>
        <input type="text" />
      </div>
      <div>
        <label for="activityDates"> Dates: </label>
        <input type="date" />
        -
        <input type="date" value="1980-08-26" />
      </div>
      <div>
        <label for="activityTime">Time:</label>
        <input style="width:20px;" type="text">
        -
        <input style="width:20px;" type="text">
      </div>
      <div>
        <label for="activityDescription"> Description: </label>
        <input type="text" />
      </div>
      <div>
        <label for="activityLocation">Activity: </label>
        <input type="text">
      </div>
      <div>
        <button>Add Activity</button>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th colspan="7">
                <h4 contenteditable="true">{{ todayYear }}</h4>
                <div>
                  <i>&lsaquo;</i>
                  <h3>{{ todayMonth }}</h3>
                  <i>&rsaquo;</i>
                </div>
              </th>
            </tr>
            <tr>
              <th v-for="day in daysInWeek" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../components/scss/Calendar";
@import "./scss/Planner";
</style>