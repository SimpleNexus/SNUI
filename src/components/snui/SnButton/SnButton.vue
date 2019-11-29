<template>
    <button :class="buttonClasses" @click="$emit('click')">
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
    accent: {
      type: Boolean,
      default: false,
      required: false
    },
    appendIcon: {
      type: String,
      default: '',
      required: false
    },
    caution: {
      type: Boolean,
      default: false,
      required: false
    },
    display: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    icon: {
      type: Boolean,
      default: false,
      required: false
    },
    outline: {
      type: Boolean,
      default: false,
      required: false
    },
    prependIcon: {
      type: String,
      default: '',
      required: false
    },
    primary: {
      type: Boolean,
      default: false,
      required: false
    },
    secondary: {
      type: Boolean,
      default: false,
      required: false
    },
    standard: {
      type: Boolean,
      default: true,
      required: false
    },
    warning: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    buttonClasses () {
      const styleClass = this.outline ? 'sn-btn-outline' : 'sn-btn'
      const modifiers = {
        '--primary': this.primary,
        '--secondary': this.secondary,
        '--warning': this.warning,
        '--caution': this.caution,
        '--accent': this.accent
      }
      const classes = ['sn-font-standard', 'sn-btn-base', styleClass]
      const baseClassLength = classes.length
      for (const [cssClass, value] of Object.entries(modifiers)) {
        if (value) {
          classes.push(styleClass + cssClass)
        }
      }
      // if no modifier classes were provided, use primary
      if (classes.length === baseClassLength) {
        classes.push(`${styleClass}--primary`)
      }
      if (this.icon) {
        classes.push(`${styleClass}--icon`)
      }
      return classes
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
    &--icon
      min-width 32px
      width 32px

  .sn-btn-icon
    width 18px
    height 18px
    vertical-align middle
    &--append
      margin-left 4px
    &--prepend
      margin-right 4px
</style>
