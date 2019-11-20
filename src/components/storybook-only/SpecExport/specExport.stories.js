/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'

import SpecExport from './SpecExport'

storiesOf('SpecExport', module)
  .add('Spec Export', () => ({
    components: { SpecExport },
    template: '<SpecExport/>'
  }))
