<template>
    <button :class="buttonClasses">
      <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'SnButton',
  props: {
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
      default: true,
      required: false
    },
    secondary: {
      type: Boolean,
      default: true,
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
        '--outline': this.outline
      }
      const classes = ['sn-font-standard', 'sn-subhead', 'sn-btn']
      for (const [cssClass, value] of Object.entries(modifiers)) {
        if (value) {
          classes.push(styleClass + cssClass)
        }
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
    padding 6.5px 26.5px
    min-width 122px
    min-height 32px
    &--primary
      background-color $primary
      color $sn-white
      border none
      cursor pointer

</style>
