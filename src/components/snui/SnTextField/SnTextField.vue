<template>
  <div :class="getFormFieldClasses">
    <div class="sn-text-field-wrapper">
      <label class="sn-font-standard sn-font-weight-light sn-text-field-label sn-text-primary--lighten-3"
             :class="{'sn-text-field-label--with-prepend-icon': !!prependIcon,
                      'sn-text-field-label--disabled': disabled
             }"
             :for="inputId"
             ref="label"
      >
        {{label}}
      </label>
      <sn-icon v-if="!!prependIcon" :name="prependIcon" class="prepend-icon" />
      <input v-model="inputValue"
             v-on="inputListeners"
             v-sn-mask="mask"
             :id="inputId"
             :name="inputId"
             ref="input"
             :type="type"
             class="sn-font-standard sn-font-weight-light sn-text-field-input sn-text-primary"
             :class="{'sn-text-field-input--invalid': !validInput,
                      'sn-text-field-input--with-prepend-icon': !!prependIcon,
                      'sn-text-field-input--with-append-icon': !!appendIcon || loading
                       }"
             :style="fullWidth ? `width: 100%` : `width: ${width}px`"
             :placeholder="placeholder"
             :disabled="disabled"
             :required="required"
      />
      <sn-icon v-if="!!appendIcon && !loading" :name="appendIcon" class="append-icon" />
      <sn-animation v-if="loading" :animation-name="loadingAnimationKey" class="sn-text-field-animation" />
      <transition name="error-message">
      <span v-if="!validInput" class="sn-font-standard sn-font-weight-light sn-text-field-message sn-text-warning">
        {{validationErrorList[0]}}
      </span>
      </transition>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/v4'
import SnIcon from '../SnIcon/SnIcon'
import SnAnimation from '../SnAnimation/SnAnimation'
import { SNUIAnimationKeys } from '../../..'

export default {
  name: 'SnTextField',
  components: { SnAnimation, SnIcon },
  props: {
    /**
     * Append the input field with an icon from the sn-icon collection.
     * Please note, do not include the sn-icon prefix in the icon name
     */
    appendIcon: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Disables the input when true
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Designates input type as full-width
     **/
    fullWidth: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Prepend the input field with an icon from the sn-icon collection.
     * Please note, do not include the sn-icon prefix in the icon name
     */
    prependIcon: {
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
     * Indicates that some sort of operation is happening. Will add a loading animation to the end of the input.
     * If there is an appended icon in the text field, the loading animation will replace it.
     **/
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * A vue-the-mask compatible input mask
     * See https://github.com/vuejs-tips/vue-the-mask
     * */
    mask: {
      type: [String, undefined],
      required: false,
      default: undefined
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
     * Defines the input type
     **/
    type: {
      type: String,
      required: false,
      default: 'text'
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
    value: null
  },
  data () {
    return {
      hasBeenActive: false,
      inputActive: false,
      inputValue: this.value,
      inputId: this.getInputId(),
      validInput: true,
      validationErrorList: [],
      validationErrorMessage: '',
      loadingAnimationKey: SNUIAnimationKeys.LOADING_SMALL
    }
  },
  methods: {
    getInputId () {
      return this.inputId ? this.inputId : `sn-text-field-${uuid()}`
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
          console.error(`Rules should return a string or a boolean, received ${typeof valid} instead`, this)
        } else if (!valid) {
          errorsList.push('Invalid value')
        }
      })
      this.validationErrorList = errorsList
      this.validInput = this.validationErrorList.length === 0
      if (!this.validInput) {
        /**
         * Fires when input is invalid with provided rules.
         * Returns the list of validation errors
         * @event error
         * @property { Array<string> }
         */
        this.$emit('error', this.validationErrorList)
      }
      /**
       * Fires when input is validated against provided rules.
       * Returns the validation state of the input
       *
       * @event validated
       * @property { boolean }
       **/
      this.$emit('validated', this.validInput)
    },
    onBlur (e) {
      if (this.shouldValidate) {
        this.$nextTick(() => this.validate())
      }
      this.inputActive = false
      this.$nextTick(() => this.$emit('blur', e))
    },
    onFocus (e) {
      this.inputActive = true
      this.$emit('focus', e)
    },
    onInput (e) {
      this.$emit('input', e.target.value)
    },
    onKeydown (e) {
      if (e.code === 'Enter') {
        this.$nextTick(() => this.$emit('change', this.inputValue))
      }
      this.$nextTick(() => this.$emit('keydown', e))
    }
  },
  watch: {
    inputActive (val) {
      if (val) {
        this.hasBeenActive = true
      }
    }
  },
  computed: {
    getFormFieldClasses () {
      return { 'sn-form-field': true,
        'sn-form-field--is-active': this.inputActive,
        'sn-form-field--is-filled': (!!this.inputValue || !!this.placeholder)
      }
    },
    /**
     * See the Vue docs: https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components
     * @returns {{} & Record<string, Function | Function[]> & {input(*): void, blur(*=): void, focus(*=): void}}
     */
    inputListeners () {
      return Object.assign({},
        this.$listeners,
        {
          blur: this.onBlur,
          focus: this.onFocus,
          input: this.onInput,
          keydown: this.onKeydown
        })
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
  padding 6px 8px
  display flex
  min-height 75px
  label-active()
    font-size 11px !important
    line-height 13px
    left 0 !important
    transform translateY(-18px)
    text-transform uppercase
    display inline-block

  // Move the label up and
  &--is-active
    .sn-text-field-input
      border-bottom 2px solid $sn-black
      max-width 100%
    .sn-text-field-label
      label-active()

  &--is-filled
    .sn-text-field-label
      label-active()

  .sn-text-field-label
    display block
    font-size 16px
    left 0
    margin 0
    position absolute
    top 2px
    transition all $animation-duration
    cursor text
    &--with-prepend-icon
      top 2px
      left 24px
    &--disabled
      cursor: not-allowed

  .sn-text-field-wrapper
    position relative
    text-align left
    display block

  .sn-text-field-input
    appearance none
    background transparent
    border 0
    font-size 16px
    line-height 21px
    border-bottom 1px solid $sn-black
    display block
    height 30px
    padding 4px 0
    outline 0
    width 100%
    box-sizing border-box
    &:required
      box-shadow none
    &::placeholder
      color $sn-black-lighten-3
    &:disabled
      color $sn-black-lighten-4
      border-bottom 1px solid $sn-black-lighten-3
      cursor: not-allowed;
    &--invalid
      box-shadow none
      outline none
      border none
      border-bottom 1px solid $warning
    &--with-prepend-icon
      padding-left 28px
    &--with-append-icon
      padding-right 28px

  .sn-text-field-message
    position absolute
    top 32px
    font-size 16px
    line-height 21px

.error-message
  &-enter-active, &-leave-active
    transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
  &-enter, &-leave-to
    opacity 0
    transform translateY(-15px)

.prepend-icon
  position absolute
  top 4px

.append-icon
  position absolute
  top 4px
  right 0

.sn-text-field-animation
  position absolute
  top 4px
  right 0
  height 18px
  width 18px
</style>
