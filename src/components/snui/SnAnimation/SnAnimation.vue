<template>
  <div ref="animate" :style="computedStyles" class="sn-animation"/>
</template>

<script>
import lottie from 'lottie-web'
import { animationLibrary, SNUIAnimationKeys } from '../../../util/animations/animationLibrary'

export default {
  name: 'SnAnimation',
  props: {
    animationName: {
      type: String,
      required: true,
      validator (name) {
        return Object.values(SNUIAnimationKeys).includes(name)
      }
    },
    width: {
      type: String,
      required: false,
      default: ''
    },
    height: {
      type: String,
      required: false,
      default: ''
    },
    loop: {
      type: Boolean,
      required: false,
      default: true
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      animation: null
    }
  },
  mounted () {
    const vm = this
    const animationLoader = animationLibrary[vm.animationName]
    if (animationLoader) {
      animationLoader().then(animationData => {
        vm.animation = lottie.loadAnimation({
          container: vm.$refs.animate,
          renderer: 'svg',
          loop: vm.loop,
          autoplay: vm.autoplay,
          animationData
        })
      })
    } else {
      console.warn(`SNUI: Could not load animation ${this.animationName}`)
    }
  },
  computed: {
    computedStyles () {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>

<style lang="stylus">
  .snui-animation-accent-color
    fill $accent
    stroke $accent

</style>
