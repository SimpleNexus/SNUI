/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import SnTextField from './SnTextField'

storiesOf('SnTextField', module)
  .add('Basic Text Field', () => ({
    components: { SnTextField },
    template: '<sn-text-field />'
  }))
  .add('With Label', () => ({
    components: { SnTextField },
    template: '<sn-text-field label="My Label" />'
  }))
  .add('With Placeholder', () => ({
    components: { SnTextField },
    template: '<sn-text-field placeholder="My Placeholder" />'
  }))
  .add('With Label and Placeholder', () => ({
    components: { SnTextField },
    template: '<sn-text-field label="My Label" placeholder="My Placeholder" />'
  }))
  .add('Disabled', () => ({
    components: { SnTextField },
    template: '<sn-text-field label="My Label" placeholder="My Placeholder" disabled />'
  }))
  .add('With Validation', () => ({
    components: { SnTextField },
    template: `<sn-text-field label="Must be at least 5 characters" required :rules="[(val) => val.length >= 5 || 'Not long enough']" />`
  }))
  .add('With Icon', () => ({
    components: { SnTextField },
    template: `<sn-text-field label="With Icon" icon="search" />`
  }))
