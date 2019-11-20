<template>
  <div class="sn-form-field">
    <div class="sn-text-field-wrapper">
      <label class="sn-font-standard sn-callout sn-text-field-label" :for="inputId">
        {{label}}
      </label>
      <input :id="inputId"
             type="text"
             class="sn-font-standard sn-body sn-text-field-input"
             :placeholder="placeholder"
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
    }
  },
  data () {
    return {
      inputId: this.getInputId()
    }
  },
  methods: {
    getInputId () {
      return this.inputId ? this.inputId : `sn-text-field-${Date.now()}-${Math.round(Math.random().toPrecision(5) * 10000)}`
    },

    setActive (el, active) {
      const formField = el.parentNode.parentNode
      if (active) {
        formField.classList.add('sn-form-field--is-active')
      } else {
        formField.classList.remove('sn-form-field--is-active')
        el.value === ''
          ? formField.classList.remove('sn-form-field--is-filled')
          : formField.classList.add('sn-form-field--is-filled')
      }
    }
  },
  mounted () {
    [].forEach.call(
      document.querySelectorAll('.sn-text-field-input'),
      (el) => {
        el.onblur = () => {
          this.setActive(el, false)
        }
        el.onfocus = () => {
          this.setActive(el, true)
        }
      }
    )
  }
}

</script>

<style scoped lang="stylus">
$animation-duration = 0.3s

label-active()
  font-size $font-size-caption-2
  line-height $line-height-caption-2
  transform translateY(-18px)

.sn-form-field
  display block

  &--is-active
    .sn-text-field-wrapper
      &::after
        border-bottom 1px solid $primary
        transform scaleX(150)

    .sn-text-field-label
      label-active()

  &--is-filled
    .sn-text-field-label
      label-active()

.sn-text-field-label
  text-transform uppercase
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
    transform scaleX(0)
    transition all $animation-duration
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
