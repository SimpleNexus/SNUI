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
    template: '<sn-text-field placeholder="My Paceholder" />'
  }))
  .add('With Label and Placeholder', () => ({
    components: { SnTextField },
    template: '<sn-text-field label="My Label" placeholder="My Paceholder" />'
  }))
