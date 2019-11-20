<template>
  <div :class="getFormFieldClasses">
    <div class="sn-text-field-wrapper">
      <label class="sn-font-standard sn-callout sn-text-field-label" :for="inputId">
        {{label}}
      </label>
      <input v-model="inputValue"
             :id="inputId"
             type="text"
             class="sn-font-standard sn-body sn-text-field-input"
             :style="`width: ${width}px`"
             :placeholder="placeholder"
             @focus="handleInputFocus"
             @blur="handleInputBlur"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnTextField',
  props: {
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
    width: {
      type: Number,
      required: false,
      default: 320
    }
  },
  data () {
    return {
      inputActive: false,
      inputValue: null,
      inputId: this.getInputId()
    }
  },
  methods: {
    getInputId () {
      return this.inputId ? this.inputId : `sn-text-field-${Date.now()}-${Math.round(Math.random().toPrecision(5) * 10000)}`
    },
    handleInputFocus () {
      this.inputActive = true
    },
    handleInputBlur () {
      this.inputActive = false
    }
  },
  computed: {
    getFormFieldClasses () {
      return { 'sn-form-field': true, 'sn-form-field--is-active': this.inputActive, 'sn-form-field--is-filled': !!this.inputValue }
    }
  }
}

</script>

<style scoped lang="stylus">
$animation-duration = 0.3s

label-active()
  font-size $font-size-caption-2
  line-height $line-height-caption-2
  transform translateY(-18px)
  text-transform uppercase

.sn-form-field
  display inline-block

  // Move the label up and
  &--is-active
    .sn-text-field-wrapper
      &::after
        border-bottom 1px solid $primary

    .sn-text-field-label
      label-active()

  &--is-filled
    .sn-text-field-label
      label-active()

.sn-text-field-label
  color $sn-grey
  display block
  font-size $font-size-footnote
  left 0
  margin 0
  padding 28px 0 0
  position absolute
  top 0
  transition all $animation-duration
  width: 100%

.sn-text-field-wrapper
  overflow hidden
  position relative
  width 100%

  &::after
    border-bottom 1px solid $primary
    bottom 0
    content ""
    display block
    left 0
    margin 0 auto
    position absolute
    right 0
    width 1%

.sn-text-field-input,
  appearance none
  background transparent
  border 0
  border-bottom 1px solid $sn-black
  color $primary
  display block
  margin-top 24px
  padding 4px 0
  outline 0
  width 100%

</style>
