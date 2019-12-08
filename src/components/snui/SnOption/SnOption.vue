<template>
  <div class="sn-option-wrapper">
    <sn-button
      circle
      :id="optionId"
      :outline="!optionValue"
      :disabled="disabled"
      @click="toggleValue"
    >
      <slot />
    </sn-button>
    <br />
    <label :for="optionId" class="sn-option-label sn-caption-2">{{label}}</label>
  </div>
</template>

<script>
import SnButton from '../SnButton/SnButton'
import uuid from 'uuid/v4'
export default {
  name: 'SnOption',
  components: { SnButton },
  props: {
    /**
     * Disables the option
     */
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Optional label appearing under the option
     */
    label: {
      type: String,
      default: '',
      required: false
    },
    /**
     * The value to be bound. Normally used via v-model
     */
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      optionValue: this.value,
      optionId: `sn-option-${uuid()}`
    }
  },
  methods: {

    toggleValue () {
      this.optionValue = !this.optionValue
      /**
       * Input event.
       *
       * @event input
       * @property {boolean} whether the option is currently selected
       */
      this.$emit('input', this.optionValue)
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-option-label
    text-transform uppercase
    text-align center
    display inline-block
    width 100%
</style>
