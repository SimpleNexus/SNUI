<template>
  <div class="sn-option-group-wrapper">
    <sn-option
      v-for="(option, i) in formattedOptions"
      v-model="optionsSelectedValue"
      :key="optionsId + i"
      :disabled="option.disabled"
      :name="name"
      :label="option.label"
      :option-value="option.value"
      :selected="option.selected"
      class="sn-option-group-child-option"
    >
        <sn-icon v-if="!!option.icon" :name="option.icon" size="large"/>
        <span v-else>{{option.text}}</span>
    </sn-option>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import SnIcon from '../SnIcon/SnIcon'
import SnOption from './SnOption'

export default {
  name: 'SnOptionGroup',
  components: { SnOption, SnIcon },
  props: {
    name: {
      type: String,
      required: true,
      default: 'sn-option-group'
    },
    options: {
      type: Array,
      default: () => [{
        label: 'string',
        disabled: false,
        selected: false,
        value: 'string | number | boolean',
        icon: 'string',
        text: 'string'
      }],
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: false,
      default: ''
    }
  },
  mounted () {
    const selectedOption = this.options.find(option => option.selected)
    if (selectedOption) {
      this.optionsSelectedValue = selectedOption.value
    }
  },
  data () {
    return {
      formattedOptions: this.getFormattedOptions(this.options),
      optionsId: `sn-option-group-${uuid()}`,
      optionsSelectedValue: ''
    }
  },
  methods: {
    getFormattedOptions (options) {
      return options.map(o => ({ ...o, inputId: `sn-options-${name}-${uuid()}` }))
    },
    selectOption (option) {
      this.optionsSelectedValue = this.optionsSelectedValue === option.value ? null : option.value
    }
  },
  watch: {
    optionsSelectedValue (value) {
      /**
       * Input event when value of radio group changes
       *
       * @event input
       * @property { string | boolean | number } value
       */
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-option-group-wrapper
    display flex
    flex-direction row

  .sn-option-group-child-option
    padding 8px
</style>
