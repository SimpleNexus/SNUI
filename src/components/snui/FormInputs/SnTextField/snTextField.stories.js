/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import SnTextField from './SnTextField'

storiesOf('SnTextField', module)
  .add('Basic Text Field', () => ({
    components: { SnTextField },
    template: '<sn-text-field label="Label" />'
  }))
