/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import SpecExport from './SpecExport'

storiesOf('Theme/Design System', module)
  .add('Spec Export', () => ({
    components: { SpecExport },
    template: '<SpecExport/>'
  }))
