<script>
export default {
  name: 'SnCheckboxInputMixin',
  template: `
      <div :class="inputWrapperClasses">
        <label :class="inputLabelClasses">
          <input
            ref="inputElement"
            v-model="internalValue"
            :class="inputElementClasses"
            :type="inputType"
            :disabled="disabled"
            :true-value="trueValue"
            :false-value="falseValue"
            @change="setValue"
          >
          <div :class="inputPseudoElementClasses"></div>
          <span :class="inputLabelTextClasses" v-if="label">
            {{label}}
      </span>
        </label>
        <p
          v-if="description"
          :class="inputDescriptionClasses"
        >
          {{description}}
        </p>
      </div>
    `,
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    description: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    falseValue: null,
    inputValue: null,
    label: {
      type: String,
      default: ''
    },
    trueValue: null,
    value: null
  },
  data () {
    return {
      inputType: 'checkbox',
      isChecked: false,
      internalValue: this.inputValue ?? false,
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
  },
  methods: {
    setValue (e) {
      this.isChecked = e.target.checked
      if (this.isMultiple) {
        this.updateArrayValue(e)
      } else {
        this.updateSingleValue(e)
      }
    },
    updateArrayValue (e) {
      const checked = e.target.checked
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
      this.$emit('change', checkedValues)
    },
    updateSingleValue (e) {
      const emitValue = e.target.checked
        ? this.internalTrueValue
        : this.internalFalseValue
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
