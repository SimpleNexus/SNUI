/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import SnIcon from '../../snui/SnIcon/SnIcon'

storiesOf('WIP/SnIcon', module)
  .add('Basic Icons', () => ({
    components: { SnIcon },
    template: `
    <div>
      <sn-icon name="cake" />
      <sn-icon size="medium" name="cake" />
      <sn-icon size="large" name="cake" />
    </div>
    `
  }), {
    info: {
      summary: `## Description
                SnIcon makes it easy to render the SimpleNexus icon font. Simply pass an icon name and a
                size to the component props`,
      components: { SnIcon }
    }
  })
