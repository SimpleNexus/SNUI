<script>
import SnCheckboxInputMixin from '../../../mixins/SnCheckboxInputMixin'

export default {
  name: 'SnCheckbox',
  mixins: [SnCheckboxInputMixin],
  data () {
    return {
      inputWrapperClasses: 'sn-checkbox--wrapper',
      inputLabelClasses: 'sn-checkbox--label',
      inputLabelTextClasses: 'sn-checkbox--label-text',
      inputDescriptionClasses: 'sn-checkbox--description'
    }
  },
  computed: {
    inputElementClasses () {
      return { 'sn-checkbox--input': true,
        'sn-checkbox--input--disabled': this.disabled
      }
    },
    inputPseudoElementClasses () {
      return {
        'sn-checkbox': true,
        'sn-checkbox--checked': this.checked,
        'sn-checkbox--disabled': this.disabled
      }
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

    .sn-checkbox--label
      display flex

    .sn-checkbox
      height 16px
      width 16px
      border solid 1px $sn-black
      position relative
      background-color $sn-white
      display flex

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

      &--label-text
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

      &--disabled
        background-color $sn-black-lighten-3
        border-color $sn-black-lighten-3

        &:after
          border-color $sn-black-lighten-3

      &--input
        position absolute
        height 16px
        width 16px
        opacity 0
        z-index 1
        cursor pointer
        &--disabled
          cursor not-allowed

</style>
