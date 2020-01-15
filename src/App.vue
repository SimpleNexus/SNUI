<template>
  <div id="app" class="snui">
    <sn-alert class="border"><span>This is an alert</span><span slot="action">CLICK</span></sn-alert>
    <sn-button class="border">Button</sn-button>
    <sn-avatar name="Jordan Wild" class="border"/>
    <sn-icon name="case" large class="border"/>
    <sn-option-group name="options" :options="options" class="border"/>
    <sn-select :items="items" class="border"/>
    <sn-switch label="Switch" class="border"/>
    <sn-tabs :tabs="tabs" class="border"/>
    <sn-text-field icon="search" label="Text Input" class="border"/>
  </div>
</template>

<script>
import { setBrandColor } from './util/colorUtils'

export default {
  name: 'app',
  data () {
    return {
      tabs: ['Tab 1', 'Tab 2'],
      options: [{
        label: 'Label',
        disabled: false,
        selected: false,
        value: 1,
        icon: 'bell'
      }, {
        label: 'Gabel',
        selected: false,
        value: 2,
        text: 'Option'
      }
      ],
      items: ['Item 1', 'Item 2'],
      switchValue: false
    }
  },
  methods: {
    setBrandColor
  }
}
</script>

<style lang="stylus">
  .border
    border solid 1px blue
</style>
