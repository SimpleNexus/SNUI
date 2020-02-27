<template>
  <transition name="fade">
    <div
      v-show="show"
      class="sn-alert-wrapper"
    >
      <div :class="alertClasses">
        <sn-icon class='sn-alert--icon' size="medium" :name="icon" />
        <div class="sn-alert--content">
          <slot />
        </div>
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
            size="medium"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SnIcon from '../SnIcon/SnIcon'
import CssClassMappingsMixin from '../../../mixins/CssClassMappingsMixin'
export default {
  name: 'SnAlert',
  components: { SnIcon },
  mixins: [CssClassMappingsMixin],
  props: {
    /**
     * Specify which type the alert should be.
     * Can be one of the following:
     * 'primary' | 'success' | 'warning' | 'caution'
     **/
    type: {
      type: String,
      default: 'primary',
      required: false,
      validator (color) {
        return ['primary', 'success', 'warning', 'caution'].includes(color)
      }
    },
    /**
     * Indicates whether the user should be able to dismiss
     * the alert. If true, includes a clickable dismiss icon
     * to the right of action slot. When click, the icon will
     * hide the component and emit a dismissed event.
     */
    dismissible: {
      type: Boolean,
      default: true
    },
    /**
     * The name of the icon to be prepended to the alert. Default is
     * the warning icon
     */
    icon: {
      type: String,
      default: 'warning'
    },
    /**
     * When given, the alert will dismiss itself after
     * the specified timeout. Value should be in milliseconds (1000ms = 1s)
     */
    timeout: {
      type: [Number, undefined],
      default: undefined
    },
    /**
     * The value the component will be bound to. Updates when the component
     * is dismissed or hidden via timeout
     */
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
      return ['sn-alert', `sn-alert--${this.type}`]
    }
  },
  methods: {
    actionClicked () {
      /**
       * Click Event on Action Slot
       *
       * @event click
       */
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
  display flex
  .sn-alert
    display flex
    align-items center
    padding 8px 4px
    border-radius 4px
    color $sn-white
    font-family $font-family
    font-weight $font-weight-semi-bold
    font-size 15px
    line-height 20px
    min-height 48px
    max-width 1104px
    min-width 500px
    &--primary
      background-color $primary
    &--warning
      background-color $warning
    &--caution
      background-color $caution
    &--success
      background-color $success
    &--icon
      display flex
      margin-left 16px
      margin-right 8px
    &--content
      display flex
      flex-grow 2
    &--dismiss
      display flex
      margin-left 8px
      margin-right 8px
      margin-top 2px
      &:hover
        cursor pointer
    &--action
      display flex
      margin-left auto
      text-transform uppercase
      margin-right 8px
      &:hover
        cursor pointer

.fade-enter-active, .fade-leave-active
  transition opacity .3s

.fade-enter, .fade-leave-to
  opacity 0

</style>
