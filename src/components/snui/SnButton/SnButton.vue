<template>
    <button :class="buttonClasses"
            :disabled="disabled"
            @click="handleClick"
    >
      <sn-icon v-if="!!prependIcon" :name="prependIcon" class="sn-btn-icon sn-btn-icon--prepend"/>
      <slot/>
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
     * Styles the button as a block, filling the width of the container
     **/
    block: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Defines the type of the button. Must be one of the following:
     * 'primary' | 'secondary' | 'caution' | 'warning'
     **/
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator (size) {
        return ['primary', 'secondary', 'caution', 'warning'].includes(size)
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
      const styleClass = 'sn-btn'
      const displayModifiers = ['icon', 'display', 'circle', 'block', 'disabled']
      return [`${styleClass}--${this.type}`, this.disabled ? `${styleClass}--${this.type}--disabled` : '']
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
  .sn-btn
    border 1px solid $sn-black
    color $sn-white
    position relative
    text-transform uppercase
    min-width 122px
    height 32px
    padding-left 16px
    padding-right 16px
    cursor pointer
    font-family $font-family
    font-weight $font-weight-medium
    font-size 15px
    line-height 20px
    vertical-align middle
    &:active
      &:after
        content ""
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background-color $sn-white
        opacity .25
    &--primary
      background-color $primary
      border-color $primary
      &--disabled
        background-color $primary-lighten-3
        border-color $primary-lighten-3
    &--secondary
      background-color $sn-white
      color $primary
      border 1px solid $primary
      &--disabled
        color $primary-lighten-3
        border-color $primary-lighten-3
    &--caution
      background-color $caution
      border-color $caution
      &--disabled
        background-color $caution-lighten-3
        border-color $caution-lighten-3
    &--warning
      background-color $warning
      border-color $warning
      &--disabled
        background-color $warning-lighten-3
        border-color $warning-lighten-3
    &--icon
      min-width 32px
      width 32px
      height 32px
      padding 0
    &--display
      font-size 20px
      font-family $font-family-condensed
      line-height 20px
      height 52px
    &--disabled
      cursor not-allowed
      &:active
        &:after
          content ""
          opacity 0
    &--circle
      border-radius 50%
      min-width 64px
      width 64px
      height 64px
      padding 0
    &--block
      min-width 122px
      width 100%

  .sn-btn-icon
    width 18px
    height 18px
    vertical-align middle
    line-height 16px
    &--prepend
      margin-right 4px
      padding-bottom 2px
</style>
