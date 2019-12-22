import { storiesOf } from '@storybook/vue'
import SnSelect from './SnSelect'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('SnSelect', module)
  .add('Basic Select', () => ({
    components: { SnSelect },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      returnObject: {
        default: boolean('Return Object (see Actions tab)', false)
      }
    },
    data () {
      return {
        defaultVal: {
          text: 'Item 1',
          value: 'item1'
        },
        items: [{
          text: 'Item 1',
          value: 'item1'
        },
        {
          text: 'Item 2',
          value: 'item2'
        }
        ]
      }
    },
    methods: {
      logInput: action('input changed')
    },
    template: `
      <sn-select
        v-model="defaultVal"
        :items="items"
        :disabled="disabled"
        :return-object="returnObject"
        @input="logInput"
      />`
  }), {
    info: {
      summary: ``
    }
  })
