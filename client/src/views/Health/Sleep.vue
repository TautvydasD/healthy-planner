<template>
  <div>
    <h1>
      Sleep
    </h1>
    <button @click="redirectToFitbit">
      Login to fitbit
    </button>

    <h3>
      Choose time interval:
    </h3>
    <div>
      <label for="to">
       Date from:
      </label>
      <input v-model="from" type="date">
    </div>
    <div>
      <label for="from">
       Date to:
      </label>
      <input v-model="to" type="date">
    </div>
    <div>
      Maximum interval is 100 days
    </div>
    {{ from }}
    {{ to }}
    <div>
      <button @click="getSleepData">Fetch Sleep Data</button>
    </div>
    <div>
      Sleep sessions: {{ sessionsCount }}
    </div>
    <div>
      Sleep efficiency average withing given time: {{ avg }}
    </div>
    <!-- <test
      :data="data"
      :options="options"
    /> -->
    <!-- <canvas id="canvas" height="400" width="650"></canvas> -->
    <!-- <dl>
      <dt>
        Browser market share June 2015
      </dt>
      <dd class="percentage percentage-11"><span class="text">IE 11: 11.33%</span></dd>
      <dd class="percentage percentage-49"><span class="text">Chrome: 49.77%</span></dd>
      <dd class="percentage percentage-16"><span class="text">Firefox: 16.09%</span></dd>
      <dd class="percentage percentage-5"><span class="text">Safari: 5.41%</span></dd>
      <dd class="percentage percentage-2"><span class="text">Opera: 1.62%</span></dd>
      <dd class="percentage percentage-2"><span class="text">Android 4.4: 2%</span></dd>
    </dl> -->
<!-- 
    <div style="height:600px;width: 600px;">
      <vue3-chart-js
        ref="chartRef"
        :id="doughnutChart.id"
        :type="doughnutChart.type"
        :data="doughnutChart.data"
      ></vue3-chart-js>
    </div> -->
  </div>
</template>

<script>
// import Test from './Test'
// import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
// import { ref } from 'vue'

export default {
  // components: {
  //   // Test,
  //   Vue3ChartJs
  // },
  // setup () {
  //   const chartRef = ref(null)
  //   const doughnutChart = {
  //     id: 'bar',
  //     type: 'bar',
  //     data: {
  //       labels: [],
  //       datasets: [
  //         {
  //         }
  //       ]
  //     }
  //   }
  //   const newChart = () => {
  //     // this.getSleepData()
  //     //...
  //     //if(a === b) {
  //     //  event.preventDefault()
  //     //}   
  //     const userId = localStorage.getItem('user_id')
  //     const accessToken = localStorage.getItem('access_token')
  //     console.log(userId)
  //     console.log(accessToken)
  //     this.$http.get('https://api.fitbit.com/1.2/user/' + userId +
  //     '/sleep/date/' + this.from + '/' + this.to + '.json', {
  //       headers: {
  //         'Authorization': 'Bearer ' + accessToken
  //       }
  //     }).then((res) => {
  //       console.log(res)
  //       this.sleepData = res.data.sleep
  //       this.calculateEfficientyAverage()
  //       doughnutChart.data.labels = this.sleepData.map(el => el.dateOfSleep)
  //       doughnutChart.data.datasets = [
  //         {
  //           label: 'Sleep analysys',
  //           data: this.sleepData.map(el => el.efficiency)
  //         }
  //       ]
  //       chartRef.value.update()
  //     })
  //   }    

  //   return {
  //     doughnutChart,
  //     newChart,
  //     chartRef
  //   }
  // },
  data () {
    return {
      from: '2020-04-01',
      to: '2020-06-01',
      fitbitURL: 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22C643&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fhealth%2Fsleep&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800',
      sleepData: [],
      avg: 0,
      sessionsCount: 0,
      accessHeaders: {},
      options: {},
      data: {},
      canvas: null,
      context: null,
      valMin: 0,
      valMax:100,
      sections: null,
      xScale: 0,
      yScale: 100,
      y: 0
    }
  },
  created () {
    if (this.$route.hash) {
      const access = this.$route.hash.replace('#', '')
      console.log(access)
      access.split('&').forEach(el => {
        const vals = el.split('=')
        this.accessHeaders[vals[0]] = vals[1]
        localStorage.setItem(vals[0], vals[1])
      })
    }
  },
  // mounted () {
  //   this.newChart()
  //   // this.getSleepData()
  // },
  methods: {
    redirectToFitbit () {
      window.location.href = this.fitbitURL
    },
    getSleepData() {
      const userId = localStorage.getItem('user_id')
      const accessToken = localStorage.getItem('access_token')
      console.log(userId)
      console.log(accessToken)
      this.$http.get('https://api.fitbit.com/1.2/user/' + userId +
      '/sleep/date/' + this.from + '/' + this.to + '.json', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then((res) => {
        console.log(res)
        this.sleepData = res.data.sleep
        this.calculateEfficientyAverage()
        // this.drawChart()
      })
    },
    calculateEfficientyAverage () {
      this.sessionsCount = this.sleepData.length
      let numSum = 0
      this.sleepData.forEach(el => {
        numSum = numSum + el.efficiency
      })
      this.avg = numSum / this.sessionsCount
    }
    // drawChart() {
    //   this.updateChart()
    // this.data = {
    //   labels: this.sleepData.map(el => el.dateOfSleep),
    //   datasets: [{
    //     label: 'Sleep analysys',
    //     data: this.sleepData.map(el => el.efficiency),
    //   }]
    // }
    // console.log(this.data)
    // this.options = {
    //   responsive: true,
    //   scales: {
    //     y: {
    //       beginAtZero: true
    //     }
    //   }
    // }
    // }
    // updateChart () {
    //   this.doughnutChart.data.labels = this.sleepData.map(el => el.dateOfSleep)
    //   this.doughnutChart.data.datasets = [
    //     {
    //       label: 'Sleep analysys',
    //       data: this.sleepData.map(el => el.efficiency)
    //     }
    //   ]

    //   this.chartRef.value.update()
    // }
  }
}
</script>

<style lang="scss" scoped>
dl {
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  position: relative;
  padding: 20px;
}

dt {
  align-self: flex-start;
  width: 100%;
  font-weight: 700;
  display: block;
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 130px;
}

.text {
  font-weight: 600;
  display: flex;
  align-items: center;
  height: 40px;
  width: 130px;
  background-color: white;
  position: absolute;
  left: 0;
  justify-content: flex-end;
}

.percentage {
  font-size: .8em;
  line-height: 1;
  text-transform: uppercase;
  width: 100%;
  height: 40px;
  margin-left: 130px;
  background: repeating-linear-gradient(
  to right,
  #ddd,
  #ddd 1px,
  #fff 1px,
  #fff 5%
);
  
  &:after {
    content: "";
    display: block;
    background-color: #3d9970;
    width: 50px;
    margin-bottom: 10px;
    height: 90%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color .3s ease;
    cursor: pointer;
  }
  &:hover,
  &:focus {
    &:after {
       background-color: #aaa; 
    }
  }
}

@for $i from 1 through 100 {
  .percentage-#{$i} {
    &:after {
      $value: ($i * 1%);
      width: $value;
    }
  }
}

#canvas{background: #ffffff;
        box-shadow:5px 5px 5px #ccc;
		border:5px solid #eee;
		margin-bottom:10px;}
</style>

