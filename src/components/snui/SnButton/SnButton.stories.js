import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { boolean, radios } from '@storybook/addon-knobs'

import SnButton from './SnButton'
import SnIcon from '../SnIcon/SnIcon'

const buttonTypeLabel = 'Button Type'
const buttonTypeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  Caution: 'caution',
  Warning: 'warning'
}
const buttonTypeDefault = 'primary'

storiesOf('SnButton', module)
  .add('All Buttons', () => ({
    components: { SnButton, SnIcon },
    template: `
      <main class="snui">
        <section>
          <h2 class="sn-large-title">Standard Buttons</h2>
          <sn-button>Primary</sn-button>
          <sn-button type="secondary">Secondary</sn-button>
          <sn-button disabled>Disabled</sn-button>
          <sn-button type="caution">Caution</sn-button>
          <sn-button type="warning">Warning</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Buttons With Icons</h2>
          <sn-button prepend-icon="search">Prepend</sn-button>
          <sn-button append-icon="search" warning>Append</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Icon Buttons</h2>
          <sn-button icon>
            <sn-icon name="airplane"/>
          </sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Circle Buttons</h2>
          <sn-button circle>
            <sn-icon size="large" name="bell"/>
          </sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Display Buttons</h2>
          <sn-button display>Display</sn-button>
          <sn-button display disabled>Disabled</sn-button>
          <sn-button display prepend-icon="search">Button</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Block Buttons</h2>
          <sn-button block class="sn-my-1">Block</sn-button>
          <sn-button block disabled class="sn-my-1">Disabled Block</sn-button>
          <sn-button display block class="sn-my-1">Display Block</sn-button>
        </section>
      </main>`
  }))
  .add('Button', () => ({
    components: { SnButton },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <sn-button
        :type="buttonType"
        :disabled="disabled"
        @click="action"
      >
        Sn Button
      </sn-button>
    `,
    methods: { action: action('clicked') }
  }), {
    info: {
      summary: `## Description
                This is the standard SnButton style.

                There are 4 variants of the button, primary, secondary, caution,
                and warning. These can be altered by the \`type\` prop.

                The button will emit a \`click \` event when clicked.
                `
    }
  })
  .add('Button with Icon', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <sn-button prepend-icon="search"
                 :type="buttonType"
                 :disabled="disabled"
                 @click="action"
      >
        Prepend
      </sn-button>
    `,
    methods: { action: action('clicked') }
  }), {
    info: {
      summary: `## Description
                An icon can be prepended to the button text via the prepend-icon prop. It can accept any valid sn-icon
                name. Please note that the sn-icon prefix can be omitted from the icon name.
                e.g. \`<sn-button prepend-icon="search">Prepend</sn-button>\`
                `,
      components: { SnButton }
    }
  })
  .add('Icon Buttons', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <sn-button
        icon
        :type="buttonType"
        :disabled="disabled"
        @click="action"
      >
        <sn-icon name="settings"/>
      </sn-button>
    `,
    methods: { action: action('clicked') }
  }), {
    info: {
      summary: `## Description
                The icon prop can be used to fix the height and width of the button to wrap an SnIcon component.
                When setting this prop to true, you should pass the default slot an SnIcon component size small, e.g.

                \`<sn-button icon><sn-icon name="settings" size="small" /></sn-button>\`
                `
    }
  })
  .add('Circle Button', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <div>
        <sn-button
          circle
          :type="buttonType"
          :disabled="disabled"
          @click="action"
        >
          <sn-icon size="large" name="bell"/>
        </sn-button>
        <sn-button
          circle
          :type="buttonType"
          :disabled="disabled"
          @click="action"
        >
          Text
        </sn-button>
      </div>
    `,
    methods: { action: action('clicked') }
  }), {
    info: {
      summary: `## Description
                SnButtons can be styled as circles. This should primarly be used to wrap large icons or small
                text snippets. The \`circle\` prop will fix the height and width of the button, so be sure not
                to overflow any text.
                `,
      components: { SnButton }
    }
  })
  .add('Display Buttons', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      },
      preicon: {
        default: boolean('Prepend Icon', false)
      }
    },
    template: `
      <sn-button
        display
        :prepend-icon="prependIcon"
        :type="buttonType"
        :disabled="disabled"
        @click="action"
      >
        Button
      </sn-button>
    `,
    methods: { action: action('clicked') },
    computed: {
      prependIcon () {
        return this.preicon ? 'search' : false
      }
    }
  }), {
    info: {
      summary: `The \`display\` prop will make the button and text larger.
                `,
      components: { SnButton }
    }
  })
  .add('Block Button', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      },
      display: {
        default: boolean('Display', false)
      },
      preicon: {
        default: boolean('Prepend Icon', false)
      }
    },
    template: `
      <div style="width: 300px">
        <sn-button
          :display="display"
          :prepend-icon="prependIcon"
          :type="buttonType"
          :disabled="disabled"
          block
          @click="action"
        >
          Button
        </sn-button>
      </div>
    `,
    methods: { action: action('clicked') },
    computed: {
      prependIcon () {
        return this.preicon ? 'search' : false
      }
    }
  }), {
    info: {
      summary: `
      ## Description
      Normally the button's width will grow to wrap the inner text. A block button will instead fill
      the width of the container.

      A block button can be combined with the display prop to increase the height of the button
      `,
      components: { SnButton }
    }
  })
