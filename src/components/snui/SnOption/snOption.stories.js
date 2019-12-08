/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { boolean } from '@storybook/addon-knobs'
import SnOption from './SnOption'
import SnIcon from '../SnIcon/SnIcon'

storiesOf('SnOption', module)
  .add('Basic Option', () => ({
    components: { SnOption, SnIcon },
    props: {
      icon: {
        default: boolean('Icon', false)
      }
    },
    data () {
      return {
        value: 'myValue'
      }
    },
    template: `
      <sn-option v-model="value" label="label">
        <sn-icon v-if="icon" name="bell" large />
        <span v-else>Text</span>
      </sn-option>`
  }), {
    info: {
      summary: `## Description
                An option selector which can be bound to a boolean value.
                The default slot can be given text or a large icon. Note that the
                option has a fixed size, so input text may not fit if too long.
                `,
      components: { SnOption }
    }
  })
