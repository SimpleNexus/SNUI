import { storiesOf } from '@storybook/vue'

import SnButton from './SnButton'
import SnIcon from '../SnIcon/SnIcon'

storiesOf('SnButton', module)
  .add('Standard Button', () => ({
    components: { SnButton },
    template: `<div>
                  <sn-button>Primary</sn-button>
                  <sn-button disabled>Disabled</sn-button>
                  <sn-button secondary>Secondary</sn-button>
                  <sn-button caution>Caution</sn-button>
                  <sn-button warning>Warning</sn-button>
                  <sn-button accent>Accent</sn-button>
               </div>
`
  }), {
    info: {
      summary: `This is the standard SnButton style. The colors for the standard style
                can be altered by using one of the color props. See below for example color usages`
    }
  })
  .add('Outline Button', () => ({
    components: { SnButton },
    template: `<div>
                  <sn-button outline>Primary</sn-button>
                  <sn-button disabled outline>Disabled</sn-button>
                  <sn-button outline secondary>Secondary</sn-button>
                  <sn-button outline caution>Caution</sn-button>
                  <sn-button outline warning>Warning</sn-button>
                  <sn-button outline accent>Accent</sn-button>
               </div>
`
  }), {
    info: {
      summary: `This is the outline style for SnButton. The colors for the outline style
                can be altered by using one of the color props. See below for example color usages`

    }
  })
  .add('Button with icon', () => ({
    components: { SnButton, SnIcon },
    template: `<div>
      <sn-button prepend-icon="search">Prepend</sn-button>
      <sn-button append-icon="search" warning>Append</sn-button>
      <br />
      <br />
      <sn-button outline prepend-icon="search">Prepend</sn-button>
      <sn-button outline warning append-icon="search">Append</sn-button>
      <br />
      <br />
      <sn-button icon><sn-icon name="search"/></sn-button>
      <sn-button outline icon><sn-icon name="search"/></sn-button>
    </div>
    `
  }), {
    info: {
      summary: `
                ## Icons with Text
                SnButton provides two icon props that will pre/append icons to the button text.
                The icon props must be given a valid sn-icon name. Please note that the sn-icon prefix
                can be omitted from the icon name.

                ## Icon only
                SnButton also takes an \`icon\` prop that will style the button as icon only.
                When this prop is used, the icon must be passed to the default slot with an
                \`<sn-icon />\` component. See below for example icon usage.`,
      components: { SnButton }
    }
  })
  .add('Circle Button', () => ({
    components: { SnButton, SnIcon },
    template: `<div>
      <sn-button circle><sn-icon large name="bell"/></sn-button>
      <sn-button outline circle><sn-icon large name="bell"/></sn-button>
      <sn-button circle disabled><sn-icon large name="bell" /></sn-button>
    </div>
    `
  }), {
    info: {
      summary: `SnButtons can also be styled as circles with either icons or text.
                When an SnButton is provided the circle prop, it can also accept a label which will
                appear below the button`,
      components: { SnButton }
    }
  })
  .add('Display Buttons', () => ({
    components: { SnButton, SnIcon },
    template: `<div>
      <sn-button display>Button</sn-button>
      <sn-button display disabled>Button</sn-button>
      <sn-button display prepend-icon="search">Button</sn-button>
      <sn-button display append-icon="search">Button</sn-button>
      <br />
      <br />
      <sn-button display outline>Button</sn-button>
      <sn-button display outline disabled>Button</sn-button>
      <sn-button display outline prepend-icon="search">Button</sn-button>
      <sn-button display outline append-icon="search">Button</sn-button>
    </div>
    `
  }), {
    info: {
      summary: `The \`display\` prop will make the button and text larger.
                Display buttons can be styled like a standard size button`,
      components: { SnButton }
    }
  })
