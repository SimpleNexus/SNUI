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
      },
      switchValue: {
        default: text('Switch Value (See actions tab)', '')
      }
    },
    data () {
      return {
        checkedValue: false
      }
    },
    watch: {
      checkedValue (val) {
        action('Value Changed')(val)
      }
    },
    template: `
      <sn-switch
        v-model="checkedValue"
        :label="label"
        :disabled="disabled"
        :description="description"
        :value="switchValue"
      />
    `
  }), {
    info: true
  }).add('Array of Switches', () => ({
    components: { SnSwitch },
    data () {
      return {
        checkedValues: ['Bill', 'Jess']
      }
    },
    watch: {
      checkedValues (val) {
        action('Values Changed')(val)
      }
    },
    template: `
  <div style="width: 500px">
    <sn-switch
      v-model="checkedValues"
      value="Jess"
      label="Jess"
    />
    <sn-switch
      v-model="checkedValues"
      value="Bob"
      label="Bob"
      />
    <sn-switch
      v-model="checkedValues"
      value="Bill"
      label="Bill"
    />
    <sn-switch
      v-model="checkedValues"
      value="Jane"
      label="Jane"
    />
    <p>
      Selected Values: {{checkedValues}}
    </p>
  </div>
  `
  }))
