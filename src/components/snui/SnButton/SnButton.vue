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
     * Styles the button as a block, filling the width of the container
     **/
    block: {
      type: Boolean,
      default: false,
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
      const displayModifiers = ['icon', 'display', 'disabled', 'circle', 'block']
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
    position relative
    text-transform uppercase
    min-width 122px
    height 32px
    cursor pointer
    font-family $font-family
    font-weight $font-weight-medium
    font-size 15px
    line-height 20px
    vertical-align middle
    &::-moz-focus-inner
      border 0

  .sn-btn
    border 1px solid $sn-black
    color $sn-white
    &:active
      &:after
        content ""
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color $sn-white
        // TODO Figure out ripple animation
        /*animation ripple .08s*/
        opacity .25
    &--primary
      background-color $primary
      border-color $primary
    &--caution
      background-color $caution
      border-color $caution
    &--warning
      background-color $warning
      border-color $warning
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
      &:active
        &:after
          content ""
          opacity 0
    &--circle
      border-radius 50%
      min-width 64px
      width 64px
      height 64px
    &--block
      min-width 122px
      height 32px
      width 100%

  .sn-btn-outline
    border 1px solid
    background-color inherit
    &--primary
      border-color $primary
      color $primary
    &--caution
      border-color $caution
      color $caution
    &--warning
      border-color $warning
      color $warning
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
      padding-bottom 2px
    &--prepend
      margin-right 4px
      padding-bottom 2px

  @keyframes ripple {
    from {
      transform scale(0)
    }
    to {
      transform scale(1)
    }
  }
</style>
