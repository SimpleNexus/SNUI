<template>
  <div class="sn-suspense">
    <sn-animation v-if="suspend" :animation-name="animationName" :style="animationStyles"/>
    <slot v-else />
  </div>
</template>

<script>
import SnAnimation from '../SnAnimation/SnAnimation'
import { SNUIAnimationKeys } from '../../..'

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
  },
  data () {
    return {
      animationName: SNUIAnimationKeys.LOADING_LARGE
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-suspense
  width 100%
  height 100%
</style>
