<script>
export default {
  name: 'SnCheckboxInputMixin',
  template: `
    <div :class="inputWrapperClasses">
      <label :class="inputLabelClasses">
        <input
          :class="inputElementClasses"
          :type="inputType"
          :disabled="disabled"
          :checked="checked"
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
      internalValue: this.inputValue ?? false,
      internalTrueValue: this.trueValue ?? this.value ?? true,
      internalFalseValue: this.falseValue ?? false
    }
  },
  computed: {
    checked () {
      return [this.value, this.internalTrueValue].includes(this.internalValue)
    }
  },
  methods: {
    setValue (e) {
      if (e.target.checked) {
        this.internalValue = this.internalTrueValue
      } else {
        this.internalValue = this.internalFalseValue
      }
      this.$emit('change', this.internalValue)
    }
  },
  watch: {
    inputValue (val) {
      this.internalValue = val
    }
  }
}
</script>
