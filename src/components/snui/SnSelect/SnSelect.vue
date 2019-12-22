<template>
  <div class="sn-select-wrapper">
    <div :class="selectBoxClasses" @click="toggleOptions">
      <sn-avatar
        class="sn-select-selected-leader"
        v-if="selectedItemAvatar"
        :image="selectedItemAvatar"
        micro
      />
      <i
        v-if="selectedItemIcon"
        class="sn-select-selected-leader"
        :class="`sn-icon-${selectedItemIcon}`"
      />
      <div class="sn-select-selected-item">{{this.selectedItemText}}</div>
      <i class="sn-select-chevron" :class="chevronIcon"/>
    </div>
    <div class="sn-select-items-wrapper" v-show="itemsVisible">
      <div
        v-for="item in items"
        :class="getItemClasses(item)"
        :key="`sn-select-item-${getItemText(item)}`"
        @click="selectItem(item)"
      >
        <sn-avatar
          v-if="getItemAvatar(item)"
          :image="getItemAvatar(item)"
          class="sn-select-item--leader"
          micro
        />
        <i v-if="getItemIcon(item)"
           class="sn-select-item--leader sn-select-item--icon"
           :class="`sn-icon-${getItemIcon(item)}`"
        />
        <span>
        {{getItemText(item)}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import SnAvatar from '../SnAvatar/SnAvatar'
export default {
  name: 'SnSelect',
  components: { SnAvatar },
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
      default: 'avatar',
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
    sorting: {
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
    selectedItemAvatar () {
      return this.getItemAvatar(this.selectedItem)
    },
    selectedItemIcon () {
      return this.getItemIcon(this.selectedItem)
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
    getItemClasses (item) {
      const classes = ['sn-select-item']
      if (this.selectedItemValue === this.getItemValue(item)) {
        classes.push('sn-select-item--selected')
      }
      if (this.getItemIcon(item) || this.getItemAvatar(item)) {
        classes.push('sn-select-item--with-leader')
      }
      if (this.sorting) {
        classes.push('sn-select-item--sorting')
      }
      return classes
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

      .sn-select-selected-leader
        padding-left 8px
        margin-right -8px
        font-size 20px

      .sn-select-chevron
        margin-right 8px

    .sn-select-items-wrapper
      display flex
      flex-direction column
      background-color white
      position absolute
      border solid 1px $sn-black
      width 208px
      z-index 10
      margin-top 40px

      .sn-select-item
        display flex
        cursor pointer
        align-items center
        padding-left 16px
        height 36px
        &--icon
          font-size 20px
        &--with-leader
          padding-left 8px
        &--selected
          background-color #EEEEEE
        &:hover
          background-color #EEEEEE
        &--leader
          padding-right 4px
</style>
