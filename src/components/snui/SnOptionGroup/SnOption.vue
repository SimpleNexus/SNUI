<template>
<div class="sn-option-wrapper">
  <sn-button
    circle
    :disabled="disabled"
    :outline="value !== optionValue"
    @click="selectOption"
  >
    <slot />
  </sn-button>
  <label :for="optionId" class="sn-option-label sn-caption-2">
    {{label}}
    <input
      v-model="inputValue"
      class="sn-option-input"
      :id="optionId"
      :name="name"
      :checked="selected"
      :value="optionValue"
      type="radio"
    />
  </label>
</div>
</template>

<script>
import SnButton from '../SnButton/SnButton'
import uuid from 'uuid/v4'

export default {
  name: 'SnOption',
  components: { SnButton },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    optionValue: {
      type: [String, Boolean, Number],
      required: true
    },
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [String, Boolean, Number],
      required: true
    }
  },
  data () {
    return {
      inputValue: this.optionValue,
      optionId: `sn-option-input-${uuid()}`
    }
  },
  methods: {
    selectOption () {
      const emitValue = this.value === this.optionValue ? '' : this.optionValue
      this.$emit('input', emitValue)
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-option-wrapper
  display flex
  flex-direction column
  align-items center
  text-align center
  .sn-option-label
    margin-top 8px
    text-transform uppercase
    text-align center
    display inline-block
    width 68px
    text-overflow word-wrap
  .sn-option-input
    display none
</style>
