<script>
export default {
  name: 'CssClassMappingsMixin',
  methods: {
    /**
     * Returns a list of strings in the form ['prefix--modifier']
     * Used mainly to dynamically generate a css class list from
     * the component props.
     *
     * Given a list of modifiers, it will check if those modifiers exist
     * on the component instance and if the value is true. If so, it
     * generates a CSS modifier class for that prop
     * @param {Array<string>} modifierList - A list of modifiers that exist as props or data members on the component instance
     * @param {string} prefix - The prefix that the modifiers will be applied to
     * @param {Object} options - Additional options
     * @param {string} [options.defaultModifier=''] - The default modifier to be returned if none of the provided ones are applied
     * @param {boolean} [options.includePrefixInClassList=true] - Include the prefix as it's own CSS class in the returned list
     * @return {Array<string>}
     */
    generateCSSModifierClasses (modifierList, prefix, options = { defaultModifier: '', includePrefixInClassList: true }) {
      const defaultOptions = {
        defaultModifier: '',
        includePrefixInClassList: true
      }
      const effectiveOptions = { ...defaultOptions, ...options }
      const { defaultModifier, includePrefixInClassList } = effectiveOptions
      /**
       * Converts the list of modifiers into an object of the form
       * {
       *   '--modifier': boolean
       * }
       * The key provides the CSS class name and the value whether or
       * not it should be returned in the class list.
       *
       * The method will attempt to read the value from the Vue object, so
       * each modifier given should exist on the component instance as
       * either a data value or a prop.
       */
      const classModifierMappings = modifierList
        .reduce((obj, color) => ({ ...obj, [`--${color}`]: this[color] }), {})

      const baseClassList = includePrefixInClassList ? [prefix] : []

      /**
       * We now reduce the object into an array of CSS classes.
       * If the value for a given object key is true, that object key
       * is combined with the given prefix to create a CSS class
       */
      const modifierClasses = Object.entries(classModifierMappings)
        .reduce((prev, [cssClass, value]) => value ? [...prev, prefix + cssClass] : prev, baseClassList)

      /**
       * If the list of applied modifiers is empty and
       * we were given a default modifier, we return that
       * default modifier. Otherwise we return the list of modifier
       * classes
       */

      console.log({ baseClassList, modifierClasses, classModifierMappings })

      if (defaultModifier && modifierClasses.length === baseClassList.length) {
        return baseClassList.concat(`${prefix}--${defaultModifier}`)
      } else {
        return modifierClasses
      }
    }
  }
}
</script>
