<template>
  <div id="app" class="snui">
    <typography/>
  </div>
</template>

<script>
import Typography from './storybook/components/Typography/Typography'
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
