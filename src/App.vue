<template>
  <div id="app">
    <sn-btn
      size="standard"
      text="test button"
      prependIcon="$snAirplane"
    />
  </div>
</template>

<script>
import snBtn from './components/snBtn/snBtn.vue'

export default {
  name: 'App',
  components: { snBtn }
}
</script>

<style scoped>
</style>
