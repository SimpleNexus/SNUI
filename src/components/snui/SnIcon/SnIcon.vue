<template>
<i :class="iconClasses" :style="computedFontSize"/>
</template>

<script>
import CssClassMappingsMixin from '../../../mixins/CssClassMappingsMixin'

export default {
  name: 'SnIcon',
  mixins: [CssClassMappingsMixin],
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
    },
    /**
     * The size in pixels of the icon
     */
    size: {
      type: [Number, String],
      required: false,
      default: 0
    }
  },
  computed: {
    computedFontSize () {
      return this.size ? { 'font-size': this.size + 'px' } : null
    },
    iconClasses () {
      const sizeModifiers = ['small', 'medium', 'large']
      return [`sn-icon-${this.name}`]
        .concat(this.generateCSSModifierClasses(sizeModifiers, 'sn-icon', { defaultModifier: 'small' }))
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
