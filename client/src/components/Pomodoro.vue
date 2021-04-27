<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/components/Pomodoro
    */
  -->
  <div>
    <!-- <div>Pomodoro</div>
    <div>Short Break</div>
    <div>Long Break</div>
    <button>Start</button>
    {{ timer }} -->
    <div class="timer-display">
      <div class="timer-display-duration">
        {{ pad2(minutesLeft) }}:{{ pad2(secondsLeft) }}
      </div>
      <div class="timer-display-name">
        Work
      </div>
    </div>
    <div class="timer-button-container">
      <button
        class="timer-button"
        :class="{ dsblButton: isActive }"
        @click="startCountDown"
        :disabled="isActive"
      >
        Start
      </button>
    </div>
    <div>
      <label for="focus">
        Focus time:

      </label>
      <input v-model="timer.focus" type="text" placeholder="25">
      minutes
    </div>
    <div>
      <label for="">
        Break time:
      </label>
      <input v-model="timer.short" type="text" placeholder="5">
      minutes
    </div>
    <div>
      <label for="long">
        Long break time:
      </label>
      <input v-model="timer.long" type="text" placeholder="60">
      minutes
    </div>
    <div>
      <label for="interval">Long break after: </label>
      <input v-model="timer.interval" type="text">
      work sprints
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isStarted: false,
      
      timer: {
        focus: 25,
        short: 5,
        long: 60,
        status: 'work',
        interval: 4
        // pomodoro: 25;
        // shortBreak: 5;
        // longBreak: 15;
        // longBreakInterval: 4;
      },
      minutesLeft: 25,
      secondsLeft: 0,
      workCounter: 0,
      isActive: false
    }
  },
  methods: {
    // addMinutes (date, minutes) {
    //   return new Date()
    // },
    startCountDown () {
      console.log(typeof this.prepareWorkCountDown)
      this.isActive = true
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
      this.isActive=false
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

<style lang="scss" scoped>
  .timer-display {
    margin-bottom: 2vh;
    text-align: center;
  }
  .timer-display-duration {
    font-size: 15vmin;
    margin-bottom: 2vh;
  }
  .timer-display-name {
    font-size: 10vmin;
  }
  .timer-button-container {
    margin-bottom: 2vh;
    text-align: center;
  }
  .timer-button {
    background: #000;
    color: white;
    border: 0;
    font-size: 10vmin;
    padding: 0.25em 1em;
    cursor: pointer;
  }
  .timer-button:active {
    background: grey;
    border-style: solid;
    border-color: #000;
  }

  .dsblButton {
    cursor:default;
    background: grey;
  }
</style>
