import { storiesOf } from '@storybook/vue'
import SnSelect from './SnSelect'

storiesOf('SnSelect', module)
  .add('Basic Select', () => ({
    components: { SnSelect },
    data () {
      return {
        items: [{
          avatarSrc: '',
          icon: '',
          sorting: false,
          text: 'Item 1',
          value: 'item1'
        },
        {
          avatarSrc: '',
          icon: '',
          sorting: false,
          text: 'Item 2',
          value: 'item2'
        }
        ]
      }
    },
    template: `<sn-select :items="items" />`
  }))
