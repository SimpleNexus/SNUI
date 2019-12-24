import { storiesOf } from '@storybook/vue'
import SnTabs from './SnTabs'

storiesOf('SnTabs', module)
  .add('Basic Tabs', () => ({
    components: { SnTabs },
    template: `<sn-tabs />`
  }), {
    info: {
      summary: ``
    }
  })
