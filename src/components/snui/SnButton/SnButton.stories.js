import { storiesOf } from '@storybook/vue'

import SnButton from './SnButton'

storiesOf('SnButton', module)
  .add('Standard Button', () => ({
    components: { SnButton },
    template: `<div>
                  <sn-button>Primary</sn-button>
                  <sn-button secondary>Secondary</sn-button>
                  <sn-button caution>Caution</sn-button>
                  <sn-button warning>Warning</sn-button>
                  <sn-button accent>Accent</sn-button>
               </div>
`
  }))
  .add('Outline Button', () => ({
    components: { SnButton },
    template: `<div>
                  <sn-button outline>Primary</sn-button>
                  <sn-button outline secondary>Secondary</sn-button>
                  <sn-button outline caution>Caution</sn-button>
                  <sn-button outline warning>Warning</sn-button>
                  <sn-button outline accent>Accent</sn-button>
               </div>
`
  }))
  .add('Button with icon', () => ({
    components: { SnButton },
    template: `<div>
      <sn-button prepend-icon="search">Prepend</sn-button>
      <sn-button append-icon="search">Append</sn-button>
      <br />
      <br />
      <sn-button outline prepend-icon="search">Prepend</sn-button>
      <sn-button outline append-icon="search">Append</sn-button>
    </div>
    `
  }))
