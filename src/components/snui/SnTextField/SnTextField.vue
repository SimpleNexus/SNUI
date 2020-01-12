<template>
  <div :class="getFormFieldClasses">
    <div class="sn-text-field-wrapper">
      <label class="sn-font-standard sn-callout sn-text-field-label sn-text-primary--lighten-3"
             :class="{'sn-text-field-label--with-icon': !!icon}"
             :for="inputId"
      >
        {{label}}
      </label>
      <sn-icon v-if="!!icon" :name="icon" class="prepend-icon" />
      <input v-model="inputValue"
             :id="inputId"
             :name="inputId"
             type="text"
             class="sn-font-standard sn-body sn-text-field-input sn-text-primary"
             :class="{'sn-text-field-input--invalid': !validInput,
                      'sn-text-field-input--with-icon': !!icon }"
             :style="`width: ${width}px`"
             :placeholder="placeholder"
             :disabled="disabled"
             :required="required"
             @focus="handleInputFocus"
             @blur="handleInputBlur"
      />
      <transition name="error-message">
      <span v-if="!validInput" class="sn-font-standard sn-footnote sn-text-field-message sn-text-warning">
        {{validationErrorList[0]}}
      </span>
      </transition>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import SnIcon from '../SnIcon/SnIcon'
export default {
  name: 'SnTextField',
  components: { SnIcon },
  props: {
    /**
     * Disables the input when true
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Prepend the input field with an icon from the sn-icon collection.
     * Please note, do not include the sn-icon prefix in the icon name
     */
    icon: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * A text label to be paired with the input.
     */
    label: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Placeholder text to be used in the input
     */
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Specifies whether this input is required. If true, will validate
     * on blur unless validateOnBlur is false. Note: This checks the input
     * field value in JavaScript, but also sets the required flag on the html input field
     */
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * The rules prop accepts an array of callback functions. While validating rules, the current v-model value will be passed to the callback.
     * This callback should return either true or a String, the error message.
     */
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    /**
     * Set the width of the input field
     */
    width: {
      type: Number,
      required: false,
      default: 320
    },
    /**
     * Indicates whether the component should perform validation against
     * the rules and required props on element blur
     */
    validateOnBlur: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * Value that will be bound to input component
     */
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      hasBeenActive: false,
      inputActive: false,
      inputValue: this.value,
      inputId: this.getInputId(),
      validInput: true,
      validationErrorList: [],
      validationErrorMessage: ''
    }
  },
  methods: {
    getInputId () {
      return this.inputId ? this.inputId : `sn-text-field-${uuid()}`
    },
    handleInputFocus () {
      this.inputActive = true
    },
    handleInputBlur () {
      if (this.shouldValidate) {
        this.validate()
      }
      this.inputActive = false
    },
    hasError () {
      return this.validationErrorList.length > 0
    },
    validate () {
      const value = this.inputValue
      const errorsList = []
      if (this.required && !value) {
        errorsList.push('Field is required')
      } else if (!this.required && !value) {
        return
      }
      this.rules.forEach(rule => {
        const valid = typeof rule === 'function' ? rule(value) : rule
        if (typeof valid === 'string') {
          errorsList.push(valid)
        } else if (typeof valid !== 'boolean') {
          console.error(`Rules should return a string or a boolean, received ${typeof value} instead`, this)
        } else if (!valid) {
          errorsList.push('The value is incorrect')
        }
      })
      this.validationErrorList = errorsList
      this.validInput = this.validationErrorList.length === 0
      /**
       * Fires when input is validated against provided rules.
       * Returns the validation state of the input
       *
       * @event validated
       * @property { boolean }
       **/
      this.$emit('validated', this.validInput)
    }
  },
  watch: {
    inputActive (val) {
      if (val) {
        this.hasBeenActive = true
      }
    },
    inputValue (val) {
      /**
       * Input event when something is entered into the field
       *
       * @event input
       * @property {string} the current value of the input field
       */
      this.$emit('input', val)
    },
    validInput (val) {
    }
  },
  computed: {
    getFormFieldClasses () {
      return { 'sn-form-field': true,
        'sn-form-field--is-active': this.inputActive,
        'sn-form-field--is-filled': (!!this.inputValue || !!this.placeholder)
      }
    },
    shouldValidate () {
      return this.hasBeenActive && this.validateOnBlur
    }
  }
}

</script>

<style scoped lang="stylus">
$animation-duration = 0.3s

.sn-form-field
  padding 8px
  display flex
  label-active()
    font-size $font-size-caption-2 !important
    line-height $line-height-caption-2
    transform translateY(-18px)
    text-transform uppercase
    padding 28px 0 0 !important
    display inline-block

  // Move the label up and
  &--is-active
    .sn-text-field-input
      border-bottom 2px solid $sn-black
    .sn-text-field-label
      label-active()

  &--is-filled
    .sn-text-field-label
      label-active()

  .sn-text-field-label
    display block
    font-size $font-size-footnote
    left 0
    margin 0
    padding 28px 0 0
    position absolute
    top 0
    transition all $animation-duration
    cursor text
    &--with-icon
      padding 28px 20px

  .sn-text-field-wrapper
    overflow hidden
    position relative
    text-align left

  .sn-text-field-input
    appearance none
    background transparent
    border 0
    font-size $font-size-footnote
    border-bottom 1px solid $sn-black
    display block
    margin-top 24px
    padding 4px 0
    outline 0
    width 100%
    &:required
      box-shadow none
    &::placeholder
      color lighten2($sn-black-var)
    &:disabled
      color lighten3($sn-grey-var)
      border-bottom 1px solid lighten2($sn-grey-var)
    &--invalid
      box-shadow none
      outline none
      border none
      border-bottom 1px solid $warning
    &--with-icon
      padding-left 20px

.error-message
  &-enter-active, &-leave-active
    transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  &-enter, &-leave-to
    opacity 0
    transform translateY(-15px)

.prepend-icon
  position absolute
  top 28px
</style>
