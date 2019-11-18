<template>
  <div id="app">
    <typography/>
  </div>
</template>

<script>
import Typography from './components/Demo/Typography'
export default {
  name: 'app',
  components: { Typography }
}
</script>

<style lang="stylus">
#app
  font-family $font
  text-align center
  margin-top 60px
</style>
