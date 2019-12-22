<template>
  <div class="sn-select-wrapper">
    <div class="sn-select" @click="toggleOptions">
      <div class="sn-select-selected-item">Dropdown</div>
      <i class="sn-select-chevron" :class="chevronIcon"/>
    </div>
    <div class="sn-select-options-wrapper" v-show="optionsVisible">
      <div
        v-for="item in items"
        class="sn-select-option"
        :key="`sn-select-option-${getItemText(item)}`"
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
    label: {
      type: String,
      default: '',
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
    }
  },
  data () {
    return {
      optionsVisible: false
    }
  },
  computed: {
    chevronIcon () {
      return this.optionsVisible ? 'sn-icon-chevron-up-small' : 'sn-icon-chevron-down-small'
    }
  },
  methods: {
    toggleOptions () {
      this.optionsVisible = !this.optionsVisible
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
        align-items center
        padding-left 16px
        height 36px

        &:hover
          background-color #EEEEEE
</style>
