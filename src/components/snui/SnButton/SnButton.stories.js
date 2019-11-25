import { storiesOf } from '@storybook/vue'

import SnButton from './SnButton'

storiesOf('SnButton', module)
  .add('Standard Button', () => ({
    components: { SnButton },
    template: '<sn-button>Button</sn-button>'
  }))
