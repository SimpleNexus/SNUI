<template>
  <transition name="fade">
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
     * Indicates the primary color should be used
     */
    primary: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates the success color should be used
     */
    success: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates the warning color should be used
     */
    warning: {
      type: Boolean,
      default: false
    },
    /**
     * Indicates the caution color should be used
     */
    caution: {
      type: Boolean,
      default: false
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
      const colorProps = ['primary', 'warning', 'success', 'caution']
      return ['sn-alert-wrapper'].concat(this.generateCSSModifierClasses(colorProps, 'sn-alert-wrapper', { defaultModifier: 'primary' }))
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
    min-height 48px
    max-width 1104px
    min-width 500px
    padding 8px 4px
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

.fade-enter-active, .fade-leave-active
  transition opacity .3s

.fade-enter, .fade-leave-to
  opacity 0

</style>
