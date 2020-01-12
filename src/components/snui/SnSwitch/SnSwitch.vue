<template>
  <div class="sn-switch-wrapper">
    <label :class="displayClasses">
      <input class="sn-switch--input"
             type="checkbox"
             :disabled="disabled"
             :checked="checked"
             :value="value"
             @change="triggerChange"
      >
      <div class="sn-switch--switcher"></div>
      <span class="sn-switch--label" v-if="label">
            {{label}}
      </span>
    </label>
    <p
      v-if="description"
      class="sn-switch--description"
    >
      {{description}}
    </p>
  </div>
</template>

<script>
import CssClassMappingsMixin from '../../../mixins/CssClassMappingsMixin'

export default {
  name: 'SnSwitch',
  mixins: [CssClassMappingsMixin],
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    /**
     * The string to be added as a switch description
     ***/
    description: {
      type: String,
      default: ''
    },
    /**
     * Disables the switch
     **/
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * When true, emits the change event on mount.
     **/
    emitOnMount: {
      type: Boolean,
      default: true
    },
    /**
     * The value that will be bound by v-model
     **/
    inputValue: null,
    /**
     * The string to be added as a label
     **/
    label: {
      type: String,
      default: ''
    },
    /**
     * This should mainly be used when binding an array
     * to a list of switches. This is used to define the
     * value of the internal html input element. When
     * the component is bound to the array, it will add/remove
     * this value on change. If given when bound to a primitive,
     * the component will emit this value when checked and false when
     * unchecked
     **/
    value: null
  },
  mounted () {
    if (this.emitOnMount) {
      this.triggerChange({ target: { checked: this.checked } })
    }
    if (this.isMultiple) {
      this.internalValue = this.inputValue.includes(this.value)
    } else {
      this.internalValue = !!this.inputValue
    }
  },
  data () {
    return {
      internalValue: false
    }
  },
  computed: {
    /**
     * Returns whether the component is bound to multiple values (e.g. an Array)
     **/
    isMultiple () {
      return Array.isArray(this.inputValue)
    },
    /**
     * Returns whether the component is currently checked. Handles
     * the case when the component is bound to an array
     **/
    checked () {
      return !!this.internalValue
    },
    /**
     * Computed css classes for the switch component
     **/
    displayClasses () {
      return {
        'sn-switch': true,
        'sn-switch--unchecked': !this.checked,
        'sn-switch--disabled': this.disabled
      }
    }
  },
  methods: {
    /**
     * Handles the change event on the checkbox input
     * @param {Object} e
     * @param {Object} e.target
     * @param {Boolean} e.target.checked
     */
    triggerChange (e) {
      if (this.isMultiple) {
        this.updateArrayInput(e)
      } else {
        this.updatePrimitiveInput(e)
      }
      this.internalValue = e.target.checked
    },
    /**
     * Handles emitting changes when component is bound to an array
     * @param {Object} e
     * @param {Object} e.target
     * @param {Boolean} e.target.checked
     */
    updateArrayInput (e) {
      const inputChecked = e.target.checked
      // make a copy of the inputValue which contains the list
      // of checked values
      const checkedValues = this.inputValue.slice()
      // look for the value of this input in the list
      const foundIndex = checkedValues.indexOf(this.value)

      if (foundIndex >= 0 && !inputChecked) {
        // We have found the index and the input is no longer checked,
        // remove it
        checkedValues.splice(foundIndex, 1)
      } else if (foundIndex === -1 && inputChecked) {
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
    /**
     * Handles emitting change events for Boolean values
     * @param {Object} e
     * @param {Object} e.target
     * @param {Boolean} e.target.checked
     */
    updatePrimitiveInput (e) {
      const inputChecked = e.target.checked
      if (inputChecked) {
        // If a custom value was given, emit that value or fallback to true
        this.$emit('change', this.value || true)
      } else {
        // Always emit false if the item is not checked
        this.$emit('change', false)
      }
    }
  },
  watch: {
    inputValue (val) {
      if (Array.isArray(val)) {
        this.internalValue = val.includes(this.value)
      } else {
        this.internalValue = !!val
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-switch-wrapper
    padding 8px
    font-family $font-family
    display flex
    flex-direction column
    max-width 256px

  .sn-switch
    position relative
    display flex
    align-items center

    &--label
      font-size 15px
      line-height 20px
      margin-left 8px

    &--description
      font-size 12px
      line-height 16px
      text-transform uppercase
      color lighten1($sn-black-var)
      margin 0
      margin-left 48px

    &--input
      opacity 0
      width 100%
      height 100%
      position absolute
      z-index 1
      cursor pointer

    &--switcher
      height 20px
      width 38px
      position relative
      background-color $sn-black
      border solid 1px $sn-black
      border-radius 100px
      display -webkit-flex
      display -ms-flex
      display flex
      align-items center
      justify-content flex-start
      cursor pointer
      transition linear .2s, background-color linear .2s

      &:after
        content ''
        height 16px
        width 16px
        border-radius 100px
        background-color $sn-white
        display block
        transition linear .15s, background-color linear .15s
        position absolute
        left 100%
        margin-left -17px
        cursor pointer
        box-shadow 0 1px 5px 0 rgba(0, 0, 0, 0.1)

    &--unchecked
      div
        justify-content flex-end
        background-color lighten2($sn-grey-var)

        &:after
          left: 19px

    &--disabled
      div
        border solid 1px disable($sn-grey-var)
        background-color disable($sn-grey-var)

      input
        cursor not-allowed
</style>
