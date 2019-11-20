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
  .add('Bold Font', () => ({
    components: { Typography },
    template: `<Typography font-weight="bold" />`
  }))
  .add('Semi-Bold Font', () => ({
    components: { Typography },
    template: `<Typography font-weight="semi-bold" />`
  }))
  .add('Medium Font', () => ({
    components: { Typography },
    template: `<Typography font-weight="medium" />`
  }))
  .add('Regular Font', () => ({
    components: { Typography },
    template: `<Typography />`
  }))
  .add('Light Font', () => ({
    components: { Typography },
    template: `<Typography font-weight="light" />`
  }))
  .add('Extra Light Font', () => ({
    components: { Typography },
    template: `<Typography font-weight="extra-light" />`
  }))
