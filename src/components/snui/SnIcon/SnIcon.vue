<template>
<i :class="iconClasses" />
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
    size: {
      type: String,
      required: false,
      default: 'small',
      validator (size) {
        return ['small', 'medium', 'large'].includes(size)
      }
    }
  },
  computed: {
    iconClasses () {
      return [`sn-icon-${this.name}`, `sn-icon--${this.size}`]
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-icon
  display inline-block
  &--small
    font-size 18px
  &--medium
    font-size 24px
  &--large
    font-size 36px
</style>
