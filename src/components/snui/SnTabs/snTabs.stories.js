import { storiesOf } from '@storybook/vue'
import SnTabs from './SnTabs'
import { boolean } from '@storybook/addon-knobs'
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
      }
    },
    methods: {
      handleInput: action('Tab Changed')
    },
    data () {
      return {
        tabs: [{
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
      }
    },
    template: `
      <sn-tabs
        :count="count"
        :column="column"
        :tabs="tabs"
        :return-object="returnObject"
        @input="handleInput"
    />`
  }), {
    info: {
      summary: ``
    }
  })
