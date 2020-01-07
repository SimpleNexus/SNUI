<template>
  <div class="sn-switch-wrapper">
    <label :class="displayClasses">
      <input class="sn-switch--input"
             type="checkbox"
             :disabled="disabled"
             :checked="value"
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
  props: {
    /**
     * The string to be added as a switch description
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * Disables the switch
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * The string to be added as a label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * The true or false value of whether the switch is on
     */
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkboxValue: this.value
    }
  },
  computed: {
    displayClasses () {
      return {
        'sn-switch': true,
        'sn-switch--unchecked': !this.value,
        'sn-switch--disabled': this.disabled
      }
    }
  },
  methods: {
    triggerChange (e) {
      this.$emit('input', e.target.checked)
    }
  },
  watch: {
    value (val) {
      this.checkboxValue = val
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-switch-wrapper
  font-family $font-family
  display flex
  flex-direction column
  max-width 250px
.sn-switch
  position relative
  display flex
  align-items center
  &--label
    font-size 15px
    line-height 20px
    margin-left 8px
  &--description
    font-weight $font-weight-light
    font-size 12px
    line-height 16px
    text-transform uppercase
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
      border solid 1px lighten3($sn-grey-var)
      background-color lighten3($sn-grey-var)
    input
      cursor not-allowed
</style>
