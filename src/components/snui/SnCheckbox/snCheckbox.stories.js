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
      },
      trueValue: {
        default: text('True Value', '')
      },
      falseValue: {
        default: text('False Value', '')
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
        :true-value="trueValue"
        :false-value="falseValue"
        @change="change"
      />`
  }), {
    info: true
  })
  .add('Bind to array values', () => ({
    components: { SnCheckbox },
    data () {
      return {
        values: [{ label: 'Label 1', prop: 123 }, { label: 'Label 2', prop: 321 }, { label: 'Label 3', prop: 453 }],
        selectedValues: []
      }
    },
    methods: {
      change: action('Value Changed')
    },
    template: `
      <section style="width: 700px">
        <SnCheckbox
          v-for="(value, index) in values"
          v-model="selectedValues"
          :value="value"
          :key="index"
          :label="value.label"
          @change="change"
        />
        <p>
          Selected Values: {{selectedValues}}
        </p>
      </section>
      `
  }))
