<template>
  <div class="sn-tabs-wrapper">
    <ul :class="{
      'sn-tabs': true,
      'sn-tabs--column': column
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
    count: {
      type: Boolean,
      default: false,
      required: false
    },
    column: {
      type: Boolean,
      default: false,
      required: false
    },
    tabs: {
      type: Array,
      default: () => [],
      required: true
    },
    tabText: {
      type: String,
      default: 'text',
      required: false
    },
    tabLink: {
      type: String,
      default: 'link',
      required: false
    },
    tabCount: {
      type: String,
      default: 'count',
      required: false
    },
    tabDisabled: {
      type: String,
      default: 'disabled',
      required: false
    },
    returnObject: {
      type: Boolean,
      default: false,
      required: false
    },
    value: {
      type: [Number, String],
      default: 0
    },
    useRouter: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data () {
    return {
      activeTabIndex: 0
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
      return tab && typeof tab === 'object' ? tab[this.tabLink] : false
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
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-tabs
    display flex
    list-style-type none

    &--column
      flex-direction column

    &--row
      flex-direction row
</style>
