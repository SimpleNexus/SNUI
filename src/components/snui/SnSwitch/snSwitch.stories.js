import { storiesOf } from '@storybook/vue'
import SnSwitch from './SnSwitch'
import { boolean, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('SnSwitch', module)
  .add('Basic Switch', () => ({
    components: { SnSwitch },
    props: {
      description: {
        default: () => text('Description', '')
      },
      disabled: {
        default: () => boolean('Disabled', false)
      },
      label: {
        default: () => text('Label', 'Label')
      },
      switchValue: {
        default: () => text('Switch Value (See actions tab)', '')
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
    info: {
      summary: `
       The switch component serves as a prettier alternative to a checkbox, although
       the behavior is basically the same. The component can be bound to a boolean value
       via v-model, and will update that value based on the current checked status of the
       underlying html input element.

       The switch component provides several props to help control its behavior, such as.
       label, description, and disabled

       An important note, this component modifies the default model prop to \`input-value\`
       and the model event to \`@change\`. If you wish to listen for check events, you must use
       \`@change\` instead of \`@input\`.
       This differs from other input fields such as SnTextField. See [the Vue Docs](https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model) for more information on custom bindings
      `
    }
  }).add('Array of Switches', () => ({
    components: { SnSwitch },
    data () {
      return {
        checkedValues: ['Sheev', 'Jess']
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
      description="Who's that girl? It's Jess"
    />
    <sn-switch
      v-model="checkedValues"
      value="Bob"
      label="Bob"
      description="Bob the Builder can he build it?"
      />
    <sn-switch
      v-model="checkedValues"
      value="Sheev"
      label="Sheev"
      description="I am the Senate"
    />
    <sn-switch
      v-model="checkedValues"
      value="Chad"
      label="Chad"
      description="Ok"
    />
    <p>
      Selected Values: {{checkedValues}}
    </p>
  </div>
  `
  }), {
    info: {
      summary: `
      Switches can be bound to an array which they will update by adding or removing their
      value. You can see an example of this in the playground above. Try toggling the
      switches and watch how it updates the array of selected values.

      When binding an array to a group of switches, you should provide each switch with a
      value prop so it knows what to add or remove from the array.

      The bound array will be replaced with a modified shallow copy (created via Array.prototype.slice())
      when a value is added or removed.

      Please note that values are case sensitive and will be searched for using indexOf
      which uses strict equals \`===\` under the hood. As such, be extra careful when
      providing numbers as values to bind to the array.
      For example, instead of passing the prop \`value="9"\` which is read as a string, pass
       \`:value="9"\` which will be read as a number
      `,
      components: { SnSwitch }
    }
  })
  .add('With custom true/false values', () => ({

    components: { SnSwitch },
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
        <SnSwitch
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
      The component can receive custom true or false values when working with a switch
      bound to a non-Array value. These props will overwrite the default switch emit values (value prop or true, and false).
      They should not be used if binding the component to an Array value.
      `
    }
  })
