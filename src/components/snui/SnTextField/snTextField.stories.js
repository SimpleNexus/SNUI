/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import SnTextField from './SnTextField'

storiesOf('SnTextField', module)
  .add('Basic Text Field', () => ({
    components: { SnTextField },
    template: `
      <div>
        <sn-text-field />
        <sn-text-field placeholder="With Placeholder"/>
        <sn-text-field label="With Label"/>
        <sn-text-field label="With Label" placeholder="With Placeholder"/>
        <sn-text-field label="Disabled" placeholder="My Placeholder" disabled/>
      </div>
    `
  }), {
    info: {
      summary: `A basic text field. Examples with reactive label, placeholder, and disabled state`
    }
  })
  .add('With Validation', () => ({
    components: { SnTextField },
    template: `
      <sn-text-field label="Must be at least 5 characters" required
                     :rules="[(val) => val.length >= 5 || 'Not long enough']"/>`
  }), {
    info: {
      summary: `SnTextField can take an array of validation rules as a prop.
                If the validateOnBlur prop is true (default), the text field will
                validate its value against the provided rules. `
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
