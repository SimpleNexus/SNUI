/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'

import SnTextField from './SnTextField'
import Vue from 'vue'
import SnMask from '../../../directives/snMask'

Vue.directive('sn-mask', SnMask)

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
      },
      loading: {
        default: boolean('Loading', false)
      }
    },
    data () {
      return {
        value: ''
      }
    },
    template: `
      <sn-text-field
        v-model="value"
        :disabled="disabled"
        :label="label"
        :placeholder="placeholder"
        :loading="loading"
      />
    `,
    methods: {
      logInput: action('input changed')
    },
    watch: {
      value (input) { this.logInput(input) }
    }
  }), {
    info: {
      summary: `## Description
                A basic text field with 2-way data binding via v-model.`
    }
  })
  .add('With Validation', () => ({
    components: { SnTextField },
    template: `
      <sn-text-field
        label="Must be at least 5 characters" required
        :rules="[(val) => val.length >= 5 || 'Not long enough']"
        @validated="logValidation"
        @input="logInput"
        @error="error"
      />`,
    methods: {
      logInput: action('input changed'),
      logValidation: action('validation'),
      error: action('error')
    }
  }), {
    info: {
      summary: `## Description
                SnTextField can take an array of validation rules as a prop.
                If the validateOnBlur prop is true (default), the text field will
                validate its value against the provided rules.

                Each rule must be a function that returns either a boolean or a string
                when given a string as an argument. If the validation function returns false,
                the input will use the string as an error message.

                After every validation, the component will emit a
                `
    }
  })
  .add('With Icon', () => ({
    components: { SnTextField },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      loading: {
        default: boolean('Loading', false)
      }
    },
    template: `
      <div>
        <sn-text-field label="With prepend icon" prepend-icon="search" :disabled="disabled" :loading="loading"/>
        <sn-text-field label="With appended icon" append-icon="crosshairs" :disabled="disabled" :loading="loading" />
        <sn-text-field label="No Icon" />
      </div>
    `
  }), {
    info: {
      summary: `SnTextField can take an pre/append icon prop that will pre/append an icon to the input field.
                The icon name must be one that is available in the sn-icon library. Please note that
                you do not need to include the sn-icon prefix in the icon name.

                Because the loading animation and the append icon take up the same slot, the loading animation
                will take precedence as seen here in this example.
                `,
      components: { SnTextField }
    }
  })
  .add('With Mask', () => ({
    components: { SnTextField },
    props: {
      mask: {
        default: text('Mask', '###-##-####')
      },
      placeholder: {
        default: text('Placeholder', '###-##-####')
      },
      loading: {
        default: boolean('Loading')
      }
    },
    methods: {
      input: action('input')
    },
    template: `
      <sn-text-field
        label="With Mask"
        :mask="mask"
        :placeholder="placeholder"
        :loading="loading"
        @input="input"
      />`
  }), {
    info: {
      summary: `
      SnTextField can be provided a Vue the Mask compatible mask. This will force
      the input to conform to a given format. Vue the Mask offers the following matchers:

      \`\`\`javascript
      '#': {pattern: /\\d/},
      'X': {pattern: /[0-9a-zA-Z]/},
      'S': {pattern: /[a-zA-Z]/},
      'A': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
      'a': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()},
      '!': {escape: true}
      \`\`\`

      Please note that the mask does not put in a placeholder, as the mask tokens are
      not always a user-friendly indication of what should be entered. Instead, it is suggested
      that you provide a placeholder that mimics the required input format.
      `
    }
  })
