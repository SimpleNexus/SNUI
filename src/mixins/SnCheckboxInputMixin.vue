<template>
  <div :class="inputWrapperClass">
    <label :class="inputLabelClasses">
      <input
        v-model="internalValue"
        class="sn-input-base-class"
        :class="inputElementClass"
        :type="inputType"
        :disabled="disabled"
        :checked="checked"
        :value="value"
        :true-value="trueValue"
        :false-value="falseValue"
      >
      <div :class="inputPseudoElementClass"></div>
      <span :class="inputLabelTextClass" v-if="label">
            {{label}}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SnCheckboxInputMixin',
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
      inputWrapperClass: 'sn-input--wrapper',
      inputLabelClasses: ['sn-input--label'],
      inputElementClass: 'sn-input--element',
      inputPseudoElementClass: 'sn-input--pseudo',
      inputLabelTextClass: 'sn-input--label-text',
      inputType: 'checkbox',
      internalValue: this.inputValue
    }
  },
  computed: {
    checked () {
      return [this.value, this.trueValue].includes(this.internalValue)
    }
  },
  watch: {
    internalValue (val) {
      this.$emit('change', val)
    },
    inputValue (val) {
      this.internalValue = val
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-input-base-class
  opacity 0
  width 100%
  height 100%
  position absolute
  z-index 1
  cursor pointer
</style>
