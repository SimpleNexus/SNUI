import { storiesOf } from '@storybook/vue'
import SnSwitch from './SnSwitch'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('SnSwitch', module)
  .add('Basic Switch', () => ({
    components: { SnSwitch },
    props: {
      description: {
        default: text('Description', '')
      },
      disabled: {
        default: boolean('Disabled', false)
      },
      label: {
        default: text('Label', 'Label')
      }
    },
    data () {
      return {
        checkedValue: false
      }
    },
    methods: {
      handleInput: action('Input')
    },
    template: `
      <sn-switch
        v-model="checkedValue"
        :label="label"
        :disabled="disabled"
        :description="description"
        @input="handleInput"
    />`
  }), {
    info: true
  })
