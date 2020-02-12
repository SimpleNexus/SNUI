<script>
export default {
  name: 'SnCheckboxInputMixin',
  render (createElement) {
    const self = this
    return createElement('div', { 'class': self.inputWrapperClasses }, [
      createElement('label', { 'class': self.inputLabelClasses }, [
        createElement('input', {
          ref: 'inputElement',
          'class': self.inputElementClasses,
          domProps: {
            type: self.inputType,
            disabled: self.disabled,
            value: self.internalTrueValue,
            'true-value': self.internalTrueValue,
            'false-value': self.internalFalseValue
          },
          on: {
            change: self.setValue
          }
        }),
        createElement('div', { 'class': self.inputPseudoElementClasses }),
        createElement('span', { 'class': self.inputLabelTextClasses }, self.label)
      ]),
      self.description ? createElement('p', { 'class': self.inputDescriptionClasses }, self.description) : undefined
    ])
  },
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    /**
     * Provide a description string for the input
     */
    description: {
      type: [String, Number],
      default: ''
    },
    /**
     * Disables the input
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Specify whether the input should emit it's value on component mount
     */
    emitOnMount: {
      type: Boolean,
      default: true
    },
    /**
     * The value to emit if input is unchecked. Defaults to false
     * Should only be used together with the trueValue prop.
     *
     * Should not be used when component is bound to an array.
     */
    falseValue: null,
    /**
     * The v-model bound value
     */
    inputValue: null,
    /**
     * Provide a label for the input
     */
    label: {
      type: [String, Number],
      default: ''
    },
    /**
     * Sets value for truthy state. Takes precedent over the `value` prop.
     * Should only be used together with falseValue prop.
     *
     * Should not be used when component is bound to an array.
     */
    trueValue: null,
    /**
     * The value of the input. Will be emitted if input is selected. Is overwritten by trueValue prop.
     * Defaults to emitting true/false if not given.
     * If bound to an array, this is the value which will be added or removed from the array
     */
    value: null
  },
  data () {
    return {
      inputType: 'checkbox',
      isChecked: false,
      internalValue: this.inputValue,
      internalTrueValue: this.trueValue ?? this.value ?? true,
      internalFalseValue: this.falseValue ?? false
    }
  },
  computed: {
    isMultiple () {
      return Array.isArray(this.inputValue)
    },
    checked () {
      return this.isChecked
    }
  },
  mounted () {
    this.isChecked = this.$refs.inputElement?.checked
    if (this.emitOnMount) {
      this.setValue({ target: { checked: this.isChecked } })
    }
  },
  methods: {
    setValue (e) {
      this.isChecked = e?.target?.checked ?? false
      if (this.isMultiple) {
        this.updateArrayValue(e)
      } else {
        this.updateSingleValue(e)
      }
    },
    updateArrayValue (e) {
      const checked = e?.target?.checked ?? false
      // make a copy of the inputValue which contains the list
      // of checked values
      const checkedValues = this.inputValue.slice()
      // look for the value of this input in the list
      const foundIndex = checkedValues.indexOf(this.internalTrueValue)

      if (foundIndex >= 0 && !checked) {
        // We have found the index and the input is no longer checked,
        // remove it
        checkedValues.splice(foundIndex, 1)
      } else if (foundIndex === -1 && checked) {
        // We have not found the index and the item is checked
        // add it
        checkedValues.push(this.value)
      } else {
        // We don't want to add or remove so just return
        return
      }

      // Emit the newly updated list
      /**
       * Change event
       *
       * @event change
       * @property {Array} the updated list of selected values
       */
      this.$emit('change', checkedValues)
    },
    updateSingleValue (e) {
      const emitValue = e?.target?.checked ?? false
        ? this.internalTrueValue
        : this.internalFalseValue
      /**
       * Change event
       *
       * @event change
       * @property {any} The current value of the input (can be modified by value, trueValue, and falseValue props)
       */
      this.$emit('change', emitValue)
    }
  },
  watch: {
    inputValue (val) {
      this.internalValue = val
    }
  }
}
</script>
