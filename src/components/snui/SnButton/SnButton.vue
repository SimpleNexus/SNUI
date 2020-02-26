<template>
    <button :class="buttonClasses"
            :disabled="disabled"
            @click="handleClick"
    >
      <sn-icon v-if="!!prependIcon" :name="prependIcon" class="sn-btn-icon sn-btn-icon--prepend"/>
      <slot/>
      <sn-icon v-if="!!appendIcon" :name="appendIcon" class="sn-btn-icon sn-btn-icon--append"/>
    </button>
</template>

<script>
import SnIcon from '../SnIcon/SnIcon'
import CssClassMappingsMixin from '../../../mixins/CssClassMappingsMixin'
export default {
  name: 'SnButton',
  components: { SnIcon },
  mixins: [CssClassMappingsMixin],
  props: {
    /**
     * The name of an icon to append to the button text
     **/
    appendIcon: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Defines the color of the button. Must be one of the following:
     * 'primary' | 'accent' | 'caution' | 'warning'
     **/
    color: {
      type: String,
      required: false,
      default: 'primary',
      validator (size) {
        return ['primary', 'accent', 'caution', 'warning'].includes(size)
      }
    },
    /**
     * Styles the button as a display button (large)
     **/
    display: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Disables the button
     */
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Styles the button as a circle (circle button)
     */
    circle: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Styles the button as icon only
     ***/
    icon: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Styles the button with an outline instead of fill
     */
    outline: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * The name of the icon to prepend to the button text
     */
    prependIcon: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    buttonClasses () {
      const styleClass = this.outline ? 'sn-btn-outline' : 'sn-btn'
      const displayModifiers = ['icon', 'display', 'disabled', 'circle']
      return ['sn-btn-base', styleClass, `${styleClass}--${this.color}`]
        .concat(this.generateCSSModifierClasses(displayModifiers, 'sn-btn'))
    }
  },
  methods: {
    handleClick () {
      /**
       * Click Event
       *
       * @event click
       */
      return this.disabled ? null : this.$emit('click', arguments)
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-btn-base
    text-transform uppercase
    min-width 122px
    height 32px
    cursor pointer
    font-family $font-family
    font-weight $font-weight-medium
    font-size 15px
    line-height 20px
    vertical-align middle
    &:focus
      outline none
    &::-moz-focus-inner
      border 0

  .sn-btn
    border 1px solid $sn-black
    color $sn-white
    &--primary
      background-color $primary
      border-color $primary
      &:active
        background-color $primary-lighten-1
    &--caution
      background-color $caution
      border-color $caution
      &:active
        background-color $caution-lighten-1
    &--warning
      background-color $warning
      border-color $warning
      &:active
        background-color $warning-lighten-1
    &--accent
      background-color $accent
      border-color $accent
    &--icon
      min-width 32px
      width 32px
    &--display
      font-size 20px
      font-family $font-family-condensed
      line-height 20px
      height 52px
    &--disabled
      cursor not-allowed
      opacity $disabled-opacity
    &--circle
      border-radius 50%
      min-width 64px
      width 64px
      height 64px

  .sn-btn-outline
    border 1px solid
    background-color inherit
    &--primary
      border-color $primary
      color $primary
      &:active
        border-color $primary-lighten-1
        color $primary-lighten-1
    &--caution
      border-color $caution
      color $caution
      &:active
        border-color $caution-lighten-1
        color $caution-lighten-1
    &--warning
      border-color $warning
      color $warning
      &:active
        border-color $warning-lighten-1
        color $warning-lighten-1
    &--accent
      border-color $accent
      color $accent
    .sn-btn--circle
      width 65px
      height 65px

  .sn-btn-icon
    width 18px
    height 18px
    vertical-align middle
    line-height 16px
    &--append
      margin-left 4px
    &--prepend
      margin-right 4px
</style>
