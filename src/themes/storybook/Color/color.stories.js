import Color from './Color'
import { storiesOf } from '@storybook/vue'

storiesOf('Theme/Colors', module).add('Colors', () => ({
  components: { Color },
  template: `<Color />`
}))
