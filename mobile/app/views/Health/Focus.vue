<template>
  <StackLayout>
    <Label text="Pomodoro timer"/>
    <Label :text="pad2(minutesLeft) + ':' + pad2(secondsLeft)"/>
    <Label :text="status"/>
    <Button text="Button" @tap="startCountDown" />
  </StackLayout>
</template>

<script>
export default {
  data () {
    return {
      isStarted: false,
      
      timer: {
        focus: 1,
        short: 1,
        long: 1,
        status: 'work',
        interval: 4
        // pomodoro: 25;
        // shortBreak: 5;
        // longBreak: 15;
        // longBreakInterval: 4;
      },
      minutesLeft: 25,
      secondsLeft: 0,
      workCounter: 0
    }
  },
  methods: {
    startCountDown () {
      console.log(typeof this.prepareWorkCountDown)
      if (this.timer.status === 'work') {
        this.startWorkCountDown()
      } else if (this.timer.status === 'short') {
        const workFunc = this.prepareWorkCountDown
        this.countDown(workFunc)
        
        
      } else if (this.timer.status === 'long') {
        const workFunc = this.prepareWorkCountDown
        this.countDown(workFunc)
        // this.prepareWorkCountDown()
        
      }
    },
    startWorkCountDown () {
      this.minutesLeft = this.timer.focus
      const workFunction = this.startWorkAlarm
      this.countDown(workFunction)
     
    },
    startWorkAlarm () {
      alert(`${this.workCounter + 1} out of ${this.timer.interval} work sprints are finished`)
      this.workCounter += 1
      if (this.workCounter === this.timer.interval) {
        this.workCounter = 0
        this.prepareLongCountDown()
      } else {
        this.prepareBreakCountDown()
      }
    },
    countDown (cb) {
      const interval = setInterval(() => {
        if (this.minutesLeft === 0 && this.secondsLeft === 0) {
          console.log()
          cb()
          clearInterval(interval)
        } else {
          if (this.secondsLeft === 0) {
            this.minutesLeft -= 1
            this.secondsLeft = 59
          } else {
            this.secondsLeft -= 1
          }
        }
      }, 1000)
    },
    prepareWorkCountDown () {
      this.timer.status = 'work'
      this.minutesLeft = this.timer.focus
    },
    prepareBreakCountDown () {
      this.timer.status = 'short'
      this.minutesLeft = this.timer.short
    },
    prepareLongCountDown () {
      this.timer.status = 'long'
      this.minutesLeft = this.timer.long
    },
    pad2 (number) {
      return (number < 10 ? '0' : '') + number.toString()
    }
  }
}
</script>