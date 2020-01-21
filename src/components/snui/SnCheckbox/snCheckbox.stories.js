import { storiesOf } from '@storybook/vue'
import SnCheckbox from './SnCheckbox'

storiesOf('SnCheckbox', module)
  .add('Basic Checkbox', () => ({
    components: { SnCheckbox },
    template: `<SnCheckbox />`
  }), {
    info: true
  })
