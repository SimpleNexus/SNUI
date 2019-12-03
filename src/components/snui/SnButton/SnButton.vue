<template>
    <button :class="buttonClasses"
            :disabled="disabled"
            @click="$emit('click')"
            id=""
    >
      <sn-icon v-if="!!prependIcon" :name="prependIcon" class="sn-btn-icon sn-btn-icon--prepend"/>
      <slot/>
      <sn-icon v-if="!!appendIcon" :name="appendIcon" class="sn-btn-icon sn-btn-icon--append"/>
    </button>
</template>

<script>
import SnIcon from '../SnIcon/SnIcon'
export default {
  name: 'SnButton',
  components: { SnIcon },
  props: {
    /**
     * Styles the button with accent colors
     **/
    accent: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * The name of an icon to append to the button text
     **/
    appendIcon: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Styles the button with caution colors
     **/
    caution: {
      type: Boolean,
      default: false,
      required: false
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
    },
    /**
     * Styles the button with primary colors
     */
    primary: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Styles the button with secondary colors
     */
    secondary: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Styles the button with warning colors
     */
    warning: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    buttonClasses () {
      const styleClass = this.outline ? 'sn-btn-outline' : 'sn-btn'
      return ['sn-btn-base', styleClass]
        .concat(this.getColorClasses(styleClass))
        .concat(this.getDisplayClasses())
    }
  },
  methods: {
    /**
     * Uses the component props to determine
     * which color styles to return.
     * @param btnStyle The base button style, outline or standard
     *  in the form 'sn-btn' or 'sn-btn-outline'
     * @returns {Array<string>}
     */
    getColorClasses (btnStyle) {
      const colorModifiers = {
        '--primary': this.primary,
        '--secondary': this.secondary,
        '--warning': this.warning,
        '--caution': this.caution,
        '--accent': this.accent
      }
      const colorClasses = Object.entries(colorModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, btnStyle + cssClass] : prev, [])

      // Perform a check so that we return primary if not specified
      return colorClasses.length ? colorClasses : [`${btnStyle}--primary`]
    },
    /**
     * Uses the component props to determine
     * which display styles to return
     * @returns {Array<string>}
     */
    getDisplayClasses () {
      const displayModifiers = {
        '--icon': this.icon,
        '--display': this.display,
        '--disabled': this.disabled,
        '--circle': this.circle
      }

      return Object.entries(displayModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, 'sn-btn' + cssClass] : prev, [])
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-btn-base
    text-transform uppercase
    outline none
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
    border none
    color $sn-white
    &--primary
      background-color $primary
    &--secondary
      background-color $secondary
    &--caution
      background-color $caution
    &--warning
      background-color $warning
    &--accent
      background-color $accent
    &--icon
      min-width 32px
      width 32px
    &--display
      font-size 20px
      font-family $font-family-condensed
      line-height 20px
      height 52px
    &--disabled
      cursor default
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
    &--secondary
      border-color $secondary
      color $secondary
    &--caution
      border-color $caution
      color $caution
    &--warning
      border-color $warning
      color $warning
    &--accent
      border-color $accent
      color $accent

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
