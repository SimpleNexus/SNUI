import { storiesOf } from '@storybook/vue'
import SnCheckbox from './SnCheckbox'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('WIP/SnCheckbox', module)
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
    info: {
      summary: `
      Standard Checkbox input component.

      The component can be bound to a boolean value
       via v-model, and will update that value based on the current checked status of the
       underlying html input element.

       The checkbox component provides several props to help control its behavior, such as
       label, description, and disabled

       An important note, this component modifies the default model prop to \`input-value\`
       and the model event to \`@change\`. If you wish to listen for check events, you must use
       \`@change\` instead of \`@input\`.
       This differs from other input fields such as SnTextField. See [the Vue Docs](https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model) for more information on custom bindings

      `
    }
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
  }), {
    info: {
      summary: `
      Checkboxes can be bound to an array which they will update by adding or removing their
      value. You can see an example of this in the playground above. Try toggling the
      checkboxes and watch how it updates the array of selected values.

      When binding an array to a group of checkboxes, you should provide each checkbox with a
      value prop so it knows what to add or remove from the array.

      The bound array will be replaced with a modified shallow copy (created via Array.prototype.slice())
      when a value is added or removed.

      Please note that values are case sensitive and will be searched for using indexOf
      which uses strict equals \`===\` under the hood. As such, be extra careful when
      providing numbers as values to bind to the array.
      For example, instead of passing the prop \`value="9"\` which is read as a string, pass
       \`:value="9"\` which will be read as a number
      `
    }
  })
  .add('With custom true/false values', () => ({
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
      trueValue: {
        default: text('True Value', 'Truth')
      },
      falseValue: {
        default: text('False Value', 'Fiction')
      }
    },
    methods: {
      change: action('Value Changed')
    },
    data () {
      return {
        checked: this.falseValue
      }
    },
    template: `
        <SnCheckbox
          v-model="checked"
          :label="label"
          :description="description"
          :disabled="disabled"
          :true-value="trueValue"
          :false-value="falseValue"
          @change="change"
        />
      `
  }), {
    info: {
      summary: `
      The component can receive custom true or false values when working with a checkbox
      bound to a non-Array value. These props will overwrite the default checkbox emit values (value prop or true, and false).
      They should not be used if binding the component to an Array value.
      `
    }
  })
