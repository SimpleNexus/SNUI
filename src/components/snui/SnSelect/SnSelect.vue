<template>
  <div class="sn-select-wrapper">
    <div :class="selectBoxClasses" @click="toggleItems" ref="selectBox">
      <sn-avatar
        class="sn-select-selected--leader"
        v-if="selectedItemAvatar"
        :image="selectedItemAvatar"
        micro
        :name="selectedItemText"
      />
      <i
        v-if="selectedItemIcon"
        class="sn-select-selected--leader"
        :class="`sn-icon-${selectedItemIcon}`"
      />
      <div class="sn-select-selected--item">
        <span
          v-if="sorting"
          class="sn-select--sort-text"
        >
          SORT:
        </span>
        {{this.selectedItemText}}
      </div>
      <i class="sn-select--chevron" :class="chevronIcon"/>
    </div>
    <ul
      v-click-outside="{
        exclude: ['selectBox'],
        handler: 'closeItems'
      }"
      v-show="itemsVisible"
      class="sn-select-items-wrapper">
      <li
        v-for="item in items"
        :class="getItemClasses(item)"
        :key="`sn-select-item-${getItemText(item)}`"
        @click="selectItem(item)"
      >
        <sn-avatar
          v-if="getItemAvatar(item)"
          :image="getItemAvatar(item)"
          class="sn-select-item--leader"
          :name="getItemText(item)"
          micro
        />
        <i v-if="getItemIcon(item)"
           class="sn-select-item--leader sn-select-item--icon"
           :class="`sn-icon-${getItemIcon(item)}`"
        />
        <span>
        {{getItemText(item)}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import SnAvatar from '../SnAvatar/SnAvatar'

export default {
  name: 'SnSelect',
  components: { SnAvatar },
  props: {
    /**
       * Boolean flag to indicate that the
       * item list should display avatars
       **/
    avatar: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Prop to control whether the select box
       * will allow input
       **/
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Prop to indicate that the
       * item list should display icons
       **/
    icon: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Used to specify which object key should be used
       * as item display text
       **/
    itemText: {
      type: String,
      default: 'text',
      required: false
    },
    /**
       * Used to specify which object key should be used
       * as item value
       **/
    itemValue: {
      type: String,
      default: 'value',
      required: false
    },
    /**
       * Used to specify which object key should be used
       * as item icon
       **/
    itemIcon: {
      type: String,
      default: 'icon',
      required: false
    },
    /**
       * Used to specify which object key should be used
       * as item avatar source
       **/
    itemAvatar: {
      type: String,
      default: 'avatar',
      required: false
    },
    /**
       * List of items to be shown in the items list.
       * Can be a list of primitives or objects. If objects
       * are provided, the item value, text, avatar, and icon
       * keys should be provided as needed to ensure the item list data
       * is mapped correctly
       **/
    items: {
      type: Array,
      default: () => []
    },
    /**
       * By default, if the item list contains objects,
       * the component will emit the value specified by the itemValue key.
       * Enabling this prop will cause the component to emit the entire
       * item object on select
       **/
    returnObject: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Indicates that the select will be used to show sorting
       * options. Prefaces the selected item with "SORT:"
       **/
    sorting: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * The data value to be modeled. The component will try and match
       * this initial value to an item in the items list. If not found,
       * the component will set the first item in the list as selected
       **/
    value: {
      default: ''
    }
  },
  data () {
    return {
      itemsVisible: false,
      selectedItem: ''
    }
  },
  computed: {
    /**
       * Returns either an up or down icon depending on
       * whether the item list is open
       */
    chevronIcon () {
      return this.itemsVisible ? 'sn-icon-chevron-up-small' : 'sn-icon-chevron-down-small'
    },
    /**
       * Helper to get teh currently selected avatar
       */
    selectedItemAvatar () {
      return this.getItemAvatar(this.selectedItem)
    },
    /**
       * Helper to get teh currently selected icon
       */
    selectedItemIcon () {
      return this.getItemIcon(this.selectedItem)
    },
    /**
       * Helper to get teh currently selected text
       */
    selectedItemText () {
      return this.getItemText(this.selectedItem)
    },
    /**
       * Helper to get teh currently selected value
       */
    selectedItemValue () {
      return this.getItemValue(this.selectedItem)
    },
    /**
       * Returns the list of CSS classes to be attached
       * to the select box
       */
    selectBoxClasses () {
      const classes = ['sn-select']
      if (this.disabled) {
        classes.push('sn-select--disabled')
      }
      return classes
    }
  },
  mounted () {
    this.validateProps()
    this.selectedItem = this.items.find(item => this.getItemValue(item) === this.getItemValue(this.value)) || this.items[0]
  },
  methods: {
    /**
     * Specifically used for closing the item list
     * */
    closeItems () {
      this.itemsVisible = false
    },
    /**
       * Controls whether the item list is shown.
       * If disabled, it will always hide the list
       */
    toggleItems () {
      if (this.disabled) {
        this.itemsVisible = false
        return
      }
      this.itemsVisible = !this.itemsVisible
    },
    /**
       * Extracts the text from a select item.
       * If the item is an object it will return the item text
       * key provided in props
       * @param {Object|number|string} item
       * @returns {number|string}
       */
    getItemText (item) {
      return item && typeof item === 'object' ? item[this.itemText] : item
    },
    /**
       * Extracts the value from a select item.
       * If the item is an object it will return the item value
       * key provided in props
       * @param {Object|string|number|boolean} item
       * @returns {string|number|boolean}
       */
    getItemValue (item) {
      return typeof item === 'object' ? item[this.itemValue] : item
    },
    /**
       * Extracts the avatar source from a select item
       * If the item is not an object, it will return null.
       * It will return the item avatar key provided in props
       * @param {Object|number|string} item
       * @returns {string | null}
       */
    getItemAvatar (item) {
      return this.avatar && typeof item === 'object' ? item[this.itemAvatar] : null
    },
    /**
       * Extracts the icon name from a select item
       * If the item is not an object, it will return null.
       * It will return the item icon key provided in props
       * @param {Object|number|string} item
       * @returns {string|null}
       */
    getItemIcon (item) {
      return this.icon && typeof item === 'object' ? item[this.itemIcon] : null
    },
    /**
       * Returns a css class list for items in the select list
       * @param {Object|number|string} item
       * @returns {Array<string>}
       */
    getItemClasses (item) {
      const classes = ['sn-select-item']
      if (this.selectedItemValue === this.getItemValue(item)) {
        classes.push('sn-select-item--selected')
      }
      if (this.getItemIcon(item) || this.getItemAvatar(item)) {
        classes.push('sn-select-item--with-leader')
      }
      return classes
    },
    /**
       * Sets the selectedItem data value to the clicked item in the list.
       * Emits this as an event and toggles the list closed
       * @param {Object|number|string} item
       */
    selectItem (item) {
      this.selectedItem = item
      // We can either emit the value property or the entire item
      const emitVal = this.returnObject ? item : this.getItemValue(item)
      this.toggleItems()
      this.$emit('input', emitVal)
    },
    /**
       * Run on mount to ensure that multiple display modifiers
       * aren't going to confuse the component.
       * Prints a warning to the console
       */
    validateProps () {
      let singlePropCount = 0
      if (this.avatar) { singlePropCount++ }
      if (this.icon) { singlePropCount++ }
      if (this.sorting) { singlePropCount++ }
      if (singlePropCount > 1) {
        console.error('Warning: SnSelect cannot multiple display modifiers, please pick one: avatar, icon, sorting')
      }
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

      &--chevron
        margin-right 8px

      &--sort-text
        font-weight $font-weight-regular

      .sn-select-selected
        &--item
          font-size 14px
          font-weight $font-weight-medium
          flex-grow 1
          padding-left 16px

        &--leader
          padding-left 8px
          margin-right -8px
          font-size 20px

    .sn-select-items-wrapper
      display flex
      flex-direction column
      background-color white
      position absolute
      border solid 1px $sn-black
      z-index 10
      margin-top 40px
      padding 0
      width 208px
      max-height 180px
      overflow-y auto

      .sn-select-item
        display flex
        flex 1
        align-items center
        list-style-type none
        cursor pointer
        padding-left 16px
        min-height 36px

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
