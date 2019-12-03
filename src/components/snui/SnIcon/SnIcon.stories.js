/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import SnIcon from './SnIcon'

storiesOf('SnIcon', module)
  .add('Basic Icons', () => ({
    components: { SnIcon },
    template: `
    <div>
      <sn-icon name="cake" />
      <sn-icon medium name="cake" />
      <sn-icon large name="cake" />
    </div>
    `
  }), {
    info: {
      summary: `A simple component to render sn-icons of different sizes.`
    }
  })
