<template>
  <div>
    <div
      class="modal-overlay"
      :class="{ closed: !enabled }"
    >
    <!-- @click="() => isEnabled = !isEnabled" -->
    </div>
    <div
      class="modal"
      :class="{ closed: !enabled }"
    >
      <div
        class="modal-content"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    enabled: {
      default: false
    }
  },
  data () {
    return {
      isEnabled: this.enabled
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/UserForm';
</style>