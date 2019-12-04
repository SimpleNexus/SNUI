/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import SnIcon from '../../snui/SnIcon/SnIcon'
import IconList from './IconList'

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
  .add('Icon List', () => ({
    components: { IconList },
    template: `<IconList />`
  }))
