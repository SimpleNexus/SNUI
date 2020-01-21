<template>
<div class="sn-checkbox--wrapper">
<label class="sn-checkbox--label-wrapper">
  <input
    class="sn-checkbox--input"
    type="checkbox"
    :disabled="disabled"
    :value="value"
    @change="triggerChange"
  />
  <div
    :class="checkboxDisplayClasses"
  />
  <span class="sn-checkbox--label" v-if="label">
    {{label}}
  </span>
</label>
  <p
    v-if="description"
    class="sn-checkbox--description"
  >
    {{description}}
  </p>
</div>
</template>

<script>
export default {
  name: 'SnCheckbox',
  props: {
    description: {
      type: String,
      default: 'This is a description'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Hello'
    },
    value: null
  },
  data () {
    return {
      internalValue: false
    }
  },
  computed: {
    checked () {
      return !!this.internalValue
    },
    checkboxDisplayClasses () {
      return {
        'sn-checkbox': true,
        'sn-checkbox--checked': this.checked,
        'sn-checkbox--disabled': this.disabled
      }
    }
  },
  methods: {
    triggerChange (e) {
      this.internalValue = e.target.checked
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-checkbox--wrapper
  padding 8px
  font-family $font-family
  display flex
  flex-direction column
  .sn-checkbox--label-wrapper
    display flex
  .sn-checkbox
    height 16px
    width 16px
    border solid 1px $sn-black
    position relative
    background-color $sn-white
    display flex
    &--label
      font-size 15px
      line-height 20px
      margin-left 8px
    &--description
      font-size 12px
      line-height 16px
      text-transform uppercase
      color $sn-black-lighten-2
      margin 0
      margin-left 26px
    &--checked
      background-color $sn-black
    &:after
      content ''
      display inline-block
      height 4px
      width 8px
      margin-top 4px
      margin-left 3px
      border-left 2px solid $sn-white
      border-bottom 2px solid $sn-white
      transform rotate(-45deg)
    &--input
      opacity 0
      position absolute
      z-index 1
      cursor pointer

</style>
