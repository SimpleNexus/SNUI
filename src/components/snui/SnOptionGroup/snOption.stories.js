/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { boolean } from '@storybook/addon-knobs'
import SnOption from './SnOption'
import SnIcon from '../SnIcon/SnIcon'
import SnOptionGroup from '../SnOptionGroup/SnOptionGroup'
import { action } from '@storybook/addon-actions'

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
      <div>
        <sn-option v-model="value" label="label" option-value="test" name="example">
          <sn-icon v-if="icon" name="bell" large />
          <span v-else>Text</span>
        </sn-option>
      </div>
      `
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
  .add('Option Group', () => ({
    components: { SnOptionGroup },
    data () {
      return {
        value: '',
        options: [{
          label: 'MyOption',
          disabled: false,
          selected: true,
          value: 'myOption',
          icon: 'bell'
        },
        {
          label: 'My Second Option',
          disabled: false,
          selected: false,
          value: 'myOption2',
          text: 'Text 2'
        }]
      }
    },
    template: `
      <sn-option-group v-model="value" :options="options" name="test"/>`,
    methods: {
      logValue: action('value-changed')
    },
    watch: {
      value (value) {
        this.logValue(value)
      }
    }
  }), {
    info: {}
  })
