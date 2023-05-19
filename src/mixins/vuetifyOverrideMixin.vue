<script>
import { kebabCase } from 'lodash'

export default {
  inheritAttrs: false,
  data () {
    return {
      vuetifyOverrideMixin: {
        bindings: {},
        // The following 3 objects are optional and are to be implemented by the components relying on this mixin
        defaultProps: {},
        overriddenProps: {}, // Blacklist
        silencedPropWarnings: []
      }
    }
  },
  watch: {
    $attrs: {
      immediate: true,
      handler () {
        // Make sure all keys are kebabCase so that overriding props works properly
        // (e.g. `backgroundColor` and `background-color` are the same prop but wouldn't override each other because they are in different formats)
        const effectiveOverriddenProps = this.kebabCaseObject(this.vuetifyOverrideMixin.overriddenProps)
        const effectiveAttrs = this.kebabCaseObject(this.$attrs)
        const effectiveDefaultProps = this.kebabCaseObject(this.vuetifyOverrideMixin.defaultProps)

        // Print warning for props that aren't respected
        const effectiveOverriddenKeys = Object.keys(effectiveOverriddenProps)
        var isInvalidProp = (prop) => effectiveOverriddenKeys.includes(prop) && !(this.vuetifyOverrideMixin.silencedPropWarnings || []).includes(prop)
        var warningProps = Object.keys(effectiveAttrs).filter(isInvalidProp)
        if (warningProps.length > 0) {
          console.warn(`${this.$options.name} component does not support and has overridden the following props: ${warningProps.join(', ')}`)
        }

        this.vuetifyOverrideMixin.bindings = {
          ...effectiveDefaultProps,
          ...effectiveAttrs,
          ...effectiveOverriddenProps
        }
      }
    }
  },
  methods: {
    kebabCaseObject (object) {
      var newObject = {}
      if (!object) return newObject

      Object.keys(object).forEach(key => {
        newObject[kebabCase(key)] = object[key]
      })
      return newObject
    },
    kebabCaseArray (array) {
      if (!array) return []
      return array.map(el => kebabCase(el))
    }
  }
}
</script>
