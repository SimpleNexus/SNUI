import { storiesOf } from '@storybook/vue'
import SnAvatar from './SnAvatar'

storiesOf('SnAvatar', module)
  .add('Basic Avatar', () => ({
    components: { SnAvatar },
    template: `<sn-avatar
      name="Billy Idol"
    />`
  }))
