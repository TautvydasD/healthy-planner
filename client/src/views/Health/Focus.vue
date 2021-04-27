<template>
  <!-- 
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: src/views/Health/Focus
    */
  -->
  <div>
    <h1>
      Focus
    </h1>
    <pomodoro />
  </div>
</template>

<script>
import Pomodoro from '@/components/Pomodoro.vue'

export default {
  components: {
    Pomodoro
  }
}
</script>