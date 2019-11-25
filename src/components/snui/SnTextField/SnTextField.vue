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
import uuid from 'uuid/v5'
import SnIcon from '../SnIcon/SnIcon'
export default {
  name: 'SnTextField',
  components: { SnIcon },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    width: {
      type: Number,
      required: false,
      default: 320
    },
    validateOnBlur: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {
    return {
      hasBeenActive: false,
      inputActive: false,
      inputValue: '',
      inputId: this.getInputId(),
      validInput: true,
      validationErrorList: [],
      validationErrorMessage: ''
    }
  },
  methods: {
    getInputId () {
      return this.inputId ? this.inputId : `sn-text-field-${uuid}`
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
    shouldValidate () {
      return this.hasBeenActive && this.validateOnBlur
    }
  }
}

</script>

<style scoped lang="stylus">
$animation-duration = 0.3s

.sn-form-field
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
    width 100%
    cursor text
    &--with-icon
      padding 28px 20px

  .sn-text-field-wrapper
    overflow hidden
    position relative
    width 100%

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
      color lighten2($primary)
    &:disabled
      color lighten3($sn-grey)
      border-bottom 1px solid lighten2($sn-grey)
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
