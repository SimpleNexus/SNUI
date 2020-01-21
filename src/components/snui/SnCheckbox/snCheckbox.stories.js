import { storiesOf } from '@storybook/vue'
import SnCheckbox from './SnCheckbox'

storiesOf('SnCheckbox', module)
  .add('Basic Checkbox', () => ({
    components: { SnCheckbox },
    template: `<SnCheckbox label="Label" description="Description"/>`
  }), {
    info: true
  })
