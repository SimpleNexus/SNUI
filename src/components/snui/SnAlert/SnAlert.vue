<template>
<div
  v-show="show"
  :class="alertClasses"
>
  <div class="sn-alert">
    <sn-icon class='sn-alert--icon' size="20" :name="icon" />
    <slot />
    <div
      class="sn-alert--action"
      @click="actionClicked"
    >
      <slot name="action" />
    </div>
    <div
      class="sn-alert--dismiss"
      @click="dismiss"
    >
      <sn-icon
        v-if="dismissible"
        name="exit"
        size="20"
      />
    </div>
  </div>
</div>
</template>

<script>
import SnIcon from '../SnIcon/SnIcon'
export default {
  name: 'SnAlert',
  components: { SnIcon },
  props: {
    dismissible: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'warning'
    },
    primary: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    caution: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: [Number, undefined],
      default: undefined
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    if (this.timeout !== undefined) {
      setTimeout(() => {
        this.dismiss()
      }, this.timeout)
    }
  },
  data () {
    return {
      show: this.value
    }
  },
  computed: {
    alertClasses () {
      const colorModifiers = {
        '--primary': this.primary,
        '--warning': this.warning,
        '--success': this.success,
        '--caution': this.caution
      }
      const colorClasses = Object.entries(colorModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, 'sn-alert-wrapper' + cssClass] : prev, [])
      return colorClasses.length ? ['sn-alert-wrapper', ...colorClasses] : ['sn-alert-wrapper', 'sn-alert-wrapper--primary']
    }
  },
  methods: {
    actionClicked () {
      this.$emit('actionClicked', arguments)
    },
    dismiss () {
      this.show = false
      this.$emit('input', false)
      this.$emit('dismissed', arguments)
    }
  },
  watch: {
    value (val) {
      this.show = val
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-alert-wrapper
  width 100%
  border-radius 4px
  color $sn-white
  font-family $font-family
  font-weight $font-weight-semi-bold
  font-size 15px
  line-height 20px
  &--primary
    background-color $primary
  &--warning
    background-color $warning
  &--caution
    background-color $caution
  &--success
    background-color $success
  .sn-alert
    display flex
    align-items center
    height 48px
    max-width 1104px
    min-width 500px
    padding 4px
    &--icon
      margin-left 16px
      margin-right 8px
    &--dismiss
      margin-left 8px
      margin-right 8px
      margin-top 4px
      &:hover
        cursor pointer
    &--action
      margin-left auto
      text-transform uppercase
      margin-right 8px
      &:hover
        cursor pointer
</style>
