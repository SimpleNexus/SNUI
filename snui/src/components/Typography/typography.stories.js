/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import Typography from './Typography'

storiesOf('Typography', module)
  .add('Standard Typography', () => ({
    components: { Typography },
    template: '<Typography />'
  }))
  .add('Condensed Typography', () => ({
    components: { Typography },
    template: '<Typography condensed />'
  }))
