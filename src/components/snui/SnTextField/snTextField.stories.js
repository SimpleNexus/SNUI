/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'

import SnTextField from './SnTextField'

storiesOf('SnTextField', module)
  .add('Basic Text Field', () => ({
    components: { SnTextField },
    props: {
      label: {
        default: text('Label', 'Label')
      },
      placeholder: {
        default: text('Placeholder', '')
      },
      disabled: {
        default: boolean('Disabled', false)
      }
    },
    data () {
      return {
        value: ''
      }
    },
    template: `
      <div>
        <sn-text-field
          v-model="value"
          :disabled="disabled"
          :label="label"
          :placeholder="placeholder"
        />
        <p class="sn-caption-1">Bound Value: {{value}}</p>
      </div>`,
    watch: {
      value (input) {
        action('Input')
      }
    }
  }), {
    info: {
      summary: `## Description
                A basic text field with 2-way data binding via v-model.`
    }
  })
  .add('With Validation', () => ({
    components: { SnTextField },
    data () { return { value: '' } },
    template: `
      <sn-text-field
        v-model="value"
        label="Must be at least 5 characters" required
        :rules="[(val) => val.length >= 5 || 'Not long enough']"
      />`
  }), {
    info: {
      summary: `## Description
                SnTextField can take an array of validation rules as a prop.
                If the validateOnBlur prop is true (default), the text field will
                validate its value against the provided rules.

                Each rule must be a function that returns either a boolean or a string
                when given a string as an argument. If the validation function returns false,
                the input will use the string as an error message.
                `
    }
  })
  .add('With Icon', () => ({
    components: { SnTextField },
    template: `
      <sn-text-field label="With Icon" icon="search"/>`
  }), {
    info: {
      summary: `SnTextField can take an icon prop that will prepend an icon to the input field.
                The icon name must be one that is available in the sn-icon library. Please note that
                you do not need to include the sn-icon prefix in the icon name`,
      components: { SnTextField }
    }
  })
