<template>
  <div>
    <canvas id="test-char"></canvas>
  </div>
</template>

<script>
// import { Bar } from 'vue-chartjs'
import Chart from 'chart.js'

export default {
  // extends: Bar,
  props: ['data', 'options'],
  data () {
    return {
      chartData: this.data,
      chartOptions: this.options
    }
  },
  computed: {
    dat () {
      return { ...this.chartData }
    },
    opt () {
      return { ...this.chartOptions }
    }
  },
  mounted() {
    // const ctx = document.getElementById('test-char')
    // new Chart(ctx, {
    //   type: 'bar',
    //   data: this.dat,
    //   options: this.opt
    // })
    const chart = this.createChart('test-char', {
      type: 'bar',
      data: this.chartData,
      options: this.options
    })
    chart.update()
  },
  watch: {
    chartData (newdat) {
      const chart = this.createChart('test-char', {
        type: 'bar',
        data: newdat,
        options: this.options
      })
      chart.update()
    }
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      })
      return myChart // <<< this returns the created chart
    }
  }
}
</script>

<style>
</style>
