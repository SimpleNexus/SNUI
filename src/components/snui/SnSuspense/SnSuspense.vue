<template>
  <div class="sn-suspense">
    <sn-animation v-if="suspend" animation-name="loading-large" :style="animationStyles"/>
    <slot v-else />
  </div>
</template>

<script>
import SnAnimation from '../SnAnimation/SnAnimation'
export default {
  name: 'SnSuspense',
  components: { SnAnimation },
  props: {
    suspend: {
      type: Boolean,
      default: false,
      required: true
    },
    animationStyles: {
      type: Object,
      default: () => ({}),
      required: false
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-suspense
  width 100%
  height 100%
</style>
