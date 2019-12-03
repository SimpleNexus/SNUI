<template>
<i :class="iconClasses"/>
</template>

<script>
export default {
  name: 'SnIcon',
  props: {
    /**
     * The name of the icon to be rendered. Must be a valid
     * icon in the sn-icon library. See https://simplenexus.dev/FrontendStyleGuide/icons/#icon-library
     * the list if icons. Please note, leave off the sn-icon prefix as the component
     * will handle rendering the correct sn-icon
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Render a small icon (default)
     */
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Render a medium icon
     */
    medium: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Render a large icon
     */
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    iconClasses () {
      return ['sn-icon', `sn-icon-${this.name}`].concat(this.getSizeClasses())
    }
  },
  methods: {
    getSizeClasses () {
      const sizeModifiers = {
        '--small': this.small,
        '--medium': this.medium,
        '--large': this.large
      }
      const sizeClasses = Object.entries(sizeModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, 'sn-icon' + cssClass] : prev, [])

      return sizeClasses.length ? sizeClasses : ['sn-icon--small']
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-icon
  display inline-block
  &--small
    font-size 17px
  &--medium
    font-size 24px
  &--large
    font-size 34px
</style>
