import { storiesOf } from '@storybook/vue'
import SnCheckbox from './SnCheckbox'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('SnCheckbox', module)
  .add('Basic Checkbox', () => ({
    components: { SnCheckbox },
    props: {
      label: {
        default: text('Label', 'Label')
      },
      description: {
        default: text('Description', 'description')
      },
      disabled: {
        default: boolean('Disabled', false)
      },
      value: {
        default: text('Value', 'My Value')
      }
    },
    methods: {
      change: action('Value Changed')
    },
    data () {
      return {
        checked: true
      }
    },
    template: `
      <SnCheckbox
        v-model="checked"
        :label="label"
        :description="description"
        :disabled="disabled"
        :value="value"
        @change="change"
      />`
  }), {
    info: true
  })
  .add('Bind to array values', () => ({
    components: { SnCheckbox },
    data () {
      return {
        values: [{ prop: 123 }, { prop: 321 }, { prop: 453 }],
        selectedValues: []
      }
    },
    methods: {
      change: action('Value Changed')
    },
    template: `
      <div>
        <SnCheckbox
          v-for="(value, index) in values"
          v-model="selectedValues"
          :value="value"
          :key="index"
          :label="index.toString()"
          @change="change"
        />
        {{selectedValues}}
      </div>
      `
  }))
