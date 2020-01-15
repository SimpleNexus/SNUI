<template>
  <div style="min-height: 900px" class="snui">
    <sn-text-field label="Search Icons" icon="search" v-model="search"/>
    <table class="sn-font-standard">
      <thead>
      <tr class="row">
        <th class="sn-title-2 col">Icon</th>
        <th class="sn-title-2 col">Name</th>
        <th class="sn-title-2 col">Tags</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="icon in filteredIcons" :key="icon.properties.name" class="row">
        <td class="sn-title-3 col"><sn-icon :name="icon.properties.name"/></td>
        <td class="sn-body col">{{icon.properties.name}}</td>
        <td class="sn-caption-1 col">
          {{ icon.icon.tags.join(', ')}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SnIcon from '../../../components/snui/SnIcon/SnIcon'
import SnTextField from '../../../components/snui/SnTextField/SnTextField'
export default {
  name: 'IconList',
  components: { SnTextField, SnIcon },
  data () {
    return {
      icons: [],
      search: ''
    }
  },
  created () {
    this.icons = require('./SimpleNexusIcons').icons.sort((a, b) => {
      if (a.properties.name.toLowerCase() < b.properties.name.toLowerCase()) {
        return -1
      }
      if (a.properties.name.toLowerCase() > b.properties.name.toLowerCase()) {
        return 1
      }
      return 0
    })
  },
  computed: {
    filteredIcons () {
      return this.search ? this.icons.filter(icon => icon.icon.tags.join(' ').toLowerCase().includes(this.search.toLowerCase())) : this.icons
    }
  }
}
</script>

<style scoped lang="stylus">
  table
    border-collapse collapse
    text-align left

  .row
    padding 8px
    border-bottom 1px solid $sn-black-lighten-3

  .col
    padding 24px
    width 140px
</style>
