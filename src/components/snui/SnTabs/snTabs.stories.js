import { storiesOf } from '@storybook/vue'
import SnTabs from './SnTabs'
import { boolean, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('SnTabs', module)
  .add('Basic Tabs', () => ({
    components: { SnTabs },
    props: {
      column: {
        default: boolean('Column', false)
      },
      count: {
        default: boolean('Show Count', true)
      },
      returnObject: {
        default: boolean('Return Object (see Actions)', false)
      },
      selectedTab: {
        default: number('Selected Tab', 0, { range: true, min: 0, max: 3, step: 1 })
      }
    },
    methods: {
      handleInput: action('Tab Changed')
    },
    data () {
      return {
        selectedTabIndex: this.selectedTab,
        tabs: [{
          text: 'W-2',
          count: 3,
          disabled: false
        }, {
          text: 'Bank Statements',
          count: 2,
          disabled: false
        }, {
          text: 'Paystubs',
          count: 0
        },
        {
          text: 'Drivers License',
          count: 0
        },
        {
          text: 'Disabled',
          disabled: true
        }]
      }
    },
    template: `
      <sn-tabs
        v-model="selectedTabIndex"
        :count="count"
        :column="column"
        :tabs="tabs"
        :return-object="returnObject"
        @input="handleInput"
    />`
  }), {
    info: {
      summary: `
      Displays a clickable list of tabs.

      The tabs are provided to the component as a list via props.
      The list be made up of just plain strings for simple tabs, or objects
      if more customization is required.

      By default the component will bind the currently selected tab index.
      Alternatively the component can bind the tab list item (string or object).
      Please note that when the \`returnObject\` prop is true, the initially selected
      tab will be matched on text equality if an initial value is present via v-model.

      An example list of tabs used to render this story:

      \`\`\`js
       const tabs = [{
          text: 'W-2',
          count: 3,
          disabled: false
        }, {
          text: 'Bank Statements',
          count: 2,
          disabled: false
        }, {
          text: 'Disabled',
          disabled: true
        }]
      \`\`\`

      The keys used to access the tab properties (text, count, link, etc)
      can be modified via the tabKEY props as listed below in the props table
      `
    }
  })
