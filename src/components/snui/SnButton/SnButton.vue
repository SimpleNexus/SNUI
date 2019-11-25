<template>
    <button :class="buttonClasses">
      <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'SnButton',
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
      const classes = ['sn-font-standard', 'sn-subhead', 'sn-font-weight-semi-bold', styleClass]
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
      return classes
    }
  }
}
</script>

<style scoped lang="stylus">
  button
    text-transform uppercase

  .sn-btn
    outline none
    min-width 122px
    height 32px
    border none
    cursor pointer
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

  .sn-btn-outline
    outline none
    min-width 122px
    height 32px
    cursor pointer
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
</style>
