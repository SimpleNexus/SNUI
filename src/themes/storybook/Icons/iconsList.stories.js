/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import IconList from './IconList'

storiesOf('Theme/Icons', module)
  .add('Icon List', () => ({
    components: { IconList },
    template: `<IconList />`
  }))
