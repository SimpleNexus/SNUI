<script>
import CssClassMappingsMixin from '../../../mixins/CssClassMappingsMixin'
import SnCheckboxInputMixin from '../../../mixins/SnCheckboxInputMixin'

export default {
  name: 'SnSwitch',
  mixins: [CssClassMappingsMixin, SnCheckboxInputMixin],
  data () {
    return {
      inputWrapperClasses: 'sn-switch-wrapper',
      inputLabelTextClasses: 'sn-switch--label',
      inputDescriptionClasses: 'sn-switch--description',
      inputPseudoElementClasses: 'sn-switch--switcher',
      inputElementClasses: 'sn-switch--input'
    }
  },
  computed: {
    /**
     * Computed css classes for the switch component
     **/
    inputLabelClasses () {
      return {
        'sn-switch': true,
        'sn-switch--unchecked': !this.checked,
        'sn-switch--disabled': this.disabled
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
      color $sn-black-lighten-2
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
        background-color $sn-black-lighten-3

        &:after
          left: 19px

    &--disabled
      div
        border solid 1px $sn-black-lighten-4
        background-color $sn-black-lighten-4

      input
        cursor not-allowed
</style>
