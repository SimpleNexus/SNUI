<template>
  <div class="sn-tabs-wrapper">
    <ul
      :class="{
      'sn-tabs': true,
      'sn-tabs--column': column,
      'sn-tabs--right-align': rightAlign
    }"
    >
      <sn-tab
        v-for="(tab, index) in tabs"
        :key="`sn-tab-${getTabText(tab)}`"
        :text="getTabText(tab)"
        :count="getTabCount(tab)"
        :active="activeTabIndex === index"
        :disabled="getTabDisabled(tab)"
        :link="getTabLink(tab)"
        :use-router="useRouter"
        :right-align="rightAlign"
        @click="setTabAsActive(tab, index)"
      />
    </ul>
  </div>
</template>

<script>
import SnTab from './SnTab'

export default {
  name: 'SnTabs',
  components: { SnTab },
  props: {
    /**
       * Instructs the component to show the tab count
       */
    count: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Displays the tabs as a column instead of a row
       */
    column: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * The list of tabs to display. Can be made
       * of objects with text, count, and link values
       * or just primitives
       */
    tabs: {
      type: Array,
      default: () => [],
      required: true
    },
    /**
       * The object key for the text to display in each tab
       */
    tabText: {
      type: String,
      default: 'text',
      required: false
    },
    /**
       * The object key for the link to be attached to each tab
       */
    tabLink: {
      type: String,
      default: 'link',
      required: false
    },
    /**
       * The object key for the count to be displayed for each tab
       */
    tabCount: {
      type: String,
      default: 'count',
      required: false
    },
    /**
       * The object key to indicate whether each tab is disabled
       */
    tabDisabled: {
      type: String,
      default: 'disabled',
      required: false
    },
    /**
       * If true, input events will emit the entire tab object instead of the tab index
       */
    returnObject: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * The tab value to be modeled. By default returns the tab index.
       * If the returnObject prop is true, will map to a tab object.
       */
    value: {
      type: [Number, Object],
      default: 0
    },
    /**
       * Use Vue router `to` attributes in tab links.
       * If false, uses hrml href attribute
       */
    useRouter: {
      type: Boolean,
      default: true,
      required: false
    },
    rightAlign: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      activeTabIndex: 0
    }
  },
  mounted () {
    if (typeof this.value === 'number') {
      this.activeTabIndex = this.value
    } else if (this.value && typeof this.value === 'object') {
      this.activeTabIndex = this.tabs.findIndex(tab => this.getTabText(tab) === this.getTabText(this.value)) || 0
    }
  },
  methods: {
    getTabText (tab) {
      return tab && typeof tab === 'object' ? tab[this.tabText] : tab
    },
    getTabDisabled (tab) {
      return tab && typeof tab === 'object' ? tab[this.tabDisabled] : false
    },
    getTabLink (tab) {
      return tab && typeof tab === 'object' ? tab[this.tabLink] : undefined
    },
    getTabCount (tab) {
      if (!this.count) {
        return undefined
      } else {
        return tab && typeof tab === 'object' ? tab[this.tabCount] : 0
      }
    },
    setTabAsActive (tab, index) {
      this.activeTabIndex = index
      const emitVal = this.returnObject ? tab : index
      this.$emit('input', emitVal)
      this.$emit('tabClicked', tab)
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-tabs
    display flex
    list-style-type none
    padding-left 0

    &--column
      flex-direction column

    &--row
      flex-direction row

    &--right-align
      text-align right
</style>
