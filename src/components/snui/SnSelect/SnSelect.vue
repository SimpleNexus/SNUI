<template>
  <div class="sn-select-wrapper">
    <div :class="selectBoxClasses" @click="toggleOptions">
      <div class="sn-select-selected-item">{{this.selectedItemText}}</div>
      <i class="sn-select-chevron" :class="chevronIcon"/>
    </div>
    <div class="sn-select-options-wrapper" v-show="itemsVisible">
      <div
        v-for="item in items"
        class="sn-select-option"
        :class="selectedItemValue === getItemValue(item) ? 'sn-select-option--selected' : ''"
        :key="`sn-select-option-${getItemText(item)}`"
        @click="selectItem(item)"
      >
        {{getItemText(item)}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SnSelect',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    itemText: {
      type: String,
      default: 'text',
      required: false
    },
    itemValue: {
      type: String,
      default: 'value',
      required: false
    },
    itemIcon: {
      type: String,
      default: 'icon',
      required: false
    },
    itemAvatar: {
      type: String,
      default: 'avatarSrc',
      required: false
    },
    items: {
      type: Array,
      default: () => []
    },
    returnObject: {
      type: Boolean,
      default: false,
      required: false
    },
    value: {
      default: ''
    }
  },
  data () {
    return {
      itemsVisible: false,
      selectedItem: this.value
    }
  },
  computed: {
    chevronIcon () {
      return this.itemsVisible ? 'sn-icon-chevron-up-small' : 'sn-icon-chevron-down-small'
    },
    selectedItemText () {
      return this.getItemText(this.selectedItem)
    },
    selectedItemValue () {
      return this.getItemValue(this.selectedItem)
    },
    selectBoxClasses () {
      const classes = ['sn-select']
      if (this.disabled) {
        classes.push('sn-select--disabled')
      }
      return classes
    }
  },
  methods: {
    toggleOptions () {
      if (this.disabled) {
        return
      }
      this.itemsVisible = !this.itemsVisible
    },
    getItemText (item) {
      return typeof item === 'object' ? item[this.itemText] : item
    },
    getItemValue (item) {
      return typeof item === 'object' ? item[this.itemValue] : item
    },
    getItemAvatar (item) {
      return typeof item === 'object' ? item[this.itemAvatar] : null
    },
    getItemIcon (item) {
      return typeof item === 'object' ? item[this.itemIcon] : null
    },
    selectItem (item) {
      this.selectedItem = item
      if (this.returnObject) {
        this.$emit('input', item)
      } else {
        this.$emit('input', this.getItemValue(item))
      }
      this.toggleOptions()
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-select-wrapper
    display flex
    flex-direction column;
    text-transform uppercase
    vertical-align center
    font-family $font-family

    .sn-select
      display flex
      width 208px
      height 36px
      border solid 1px $sn-black
      align-items center
      cursor pointer
      &--disabled
        cursor not-allowed
        opacity $disabled-opacity

      .sn-select-selected-item
        font-size 14px
        font-weight $font-weight-medium
        flex-grow 1
        padding-left 16px

      .sn-select-chevron
        margin-right 8px

    .sn-select-options-wrapper
      display flex
      flex-direction column
      background-color white
      position absolute
      border solid 1px $sn-black
      width 208px
      z-index 10
      margin-top 40px

      .sn-select-option
        display flex
        cursor pointer
        align-items center
        padding-left 16px
        height 36px
        &--selected
          background-color #EEEEEE
        &:hover
          background-color #EEEEEE
</style>
