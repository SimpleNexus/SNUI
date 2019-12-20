import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { boolean, radios } from '@storybook/addon-knobs'

import SnButton from './SnButton'
import SnIcon from '../SnIcon/SnIcon'

const buttonTypeLabel = 'Button Type'
const buttonTypeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  Accent: 'accent',
  Caution: 'caution',
  Warning: 'warning'
}
const buttonTypeDefault = 'primary'
const computedButtonType = {
  accent () {
    return this.buttonType === 'accent'
  },
  primary () {
    return this.buttonType === 'primary'
  },
  secondary () {
    return this.buttonType === 'secondary'
  },
  caution () {
    return this.buttonType === 'caution'
  },
  warning () {
    return this.buttonType === 'warning'
  }
}

storiesOf('SnButton', module)
  .add('All Buttons', () => ({
    components: { SnButton, SnIcon },
    template: `
      <main class="snui">
        <section>
          <h2 class="sn-large-title">Standard Buttons</h2>
          <sn-button>Primary</sn-button>
          <sn-button disabled>Disabled</sn-button>
          <sn-button secondary>Secondary</sn-button>
          <sn-button caution>Caution</sn-button>
          <sn-button warning>Warning</sn-button>
          <sn-button accent>Accent</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Outline Buttons</h2>
          <sn-button outline>Primary</sn-button>
          <sn-button disabled outline>Disabled</sn-button>
          <sn-button outline secondary>Secondary</sn-button>
          <sn-button outline caution>Caution</sn-button>
          <sn-button outline warning>Warning</sn-button>
          <sn-button outline accent>Accent</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Buttons With Icons</h2>
          <sn-button prepend-icon="search">Prepend</sn-button>
          <sn-button append-icon="search" warning>Append</sn-button>
          <sn-button outline prepend-icon="search">Prepend</sn-button>
          <sn-button outline warning append-icon="search">Append</sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Icon Buttons</h2>
          <sn-button icon>
            <sn-icon name="search"/>
          </sn-button>
          <sn-button outline icon>
            <sn-icon name="search"/>
          </sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Circle Buttons</h2>
          <sn-button circle>
            <sn-icon large name="bell"/>
          </sn-button>
          <sn-button outline circle>
            <sn-icon large name="bell"/>
          </sn-button>
          <sn-button circle disabled>
            <sn-icon large name="bell"/>
          </sn-button>
        </section>
        <section>
          <h2 class="sn-large-title">Display Buttons</h2>
          <sn-button display>Button</sn-button>
          <sn-button display disabled>Button</sn-button>
          <sn-button display prepend-icon="search">Button</sn-button>
          <sn-button display append-icon="search">Button</sn-button>
          <br/>
          <br/>
          <sn-button display outline>Button</sn-button>
          <sn-button display outline disabled>Button</sn-button>
          <sn-button display outline prepend-icon="search">Button</sn-button>
          <sn-button display outline append-icon="search">Button</sn-button>
        </section>
      </main>`
  }))
  .add('Standard Button', () => ({
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
        :primary="primary"
        :secondary="secondary"
        :accent="accent"
        :caution="caution"
        :warning="warning"
        :disabled="disabled"
        @click="action">Sn Button
      </sn-button>`,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType
    }
  }), {
    info: {
      summary: `## Description
                This is the standard SnButton style. The colors for the standard style
                can be altered by using one of the button type props.`
    }
  })
  .add('Outline Button', () => ({
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
        outline
        :primary="primary"
        :secondary="secondary"
        :accent="accent"
        :caution="caution"
        :warning="warning"
        :disabled="disabled"
        @click="action">Sn Button
      </sn-button>`,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType
    }
  }), {
    info: {
      summary: `## Description
                This is the outline style for SnButton. The colors for the outline style
                can be altered by using one of the button type props.`
    }
  })
  .add('Button with Icon', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      outline: {
        default: boolean('Outline', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <div>
        <sn-button prepend-icon="search"
                   :primary="primary"
                   :secondary="secondary"
                   :accent="accent"
                   :caution="caution"
                   :warning="warning"
                   :disabled="disabled"
                   :outline="outline"
                   @click="action"
        >
          Prepend
        </sn-button>
        <sn-button append-icon="search"
                   :primary="primary"
                   :secondary="secondary"
                   :accent="accent"
                   :caution="caution"
                   :warning="warning"
                   :disabled="disabled"
                   :outline="outline"
                   @click="action"
        >
          Append
        </sn-button>
      </div>
    `,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType
    }
  }), {
    info: {
      summary: `## Description
                SnButton provides two icon props that will pre/append icons to the button text.
                The icon props must be given a valid sn-icon name. Please note that the sn-icon prefix
                can be omitted from the icon name.`,
      components: { SnButton }
    }
  })
  .add('Icon Buttons', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      outline: {
        default: boolean('Outline', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      }
    },
    template: `
      <sn-button
        icon
        :primary="primary"
        :secondary="secondary"
        :accent="accent"
        :caution="caution"
        :warning="warning"
        :disabled="disabled"
        :outline="outline"
        @click="action"
      >
        <sn-icon name="search"/>
      </sn-button>
    `,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType
    }
  }), {
    info: {
      summary: `## Description
                SnButton also takes an \`icon\` prop that will style the button as icon only.
                When this prop is used, the icon must be passed to the default slot with an
                \`<sn-icon />\` component. See below for example icon usage.`
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
        :primary="primary"
        :secondary="secondary"
        :accent="accent"
        :caution="caution"
        :warning="warning"
        :disabled="disabled"
        @click="action"
      >
        <sn-icon large name="bell"/>
      </sn-button>
      <sn-button
        circle
        :primary="primary"
        :secondary="secondary"
        :accent="accent"
        :caution="caution"
        :warning="warning"
        :disabled="disabled"
        @click="action"
      >
        Text
      </sn-button>
      </div>
    `,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType
    }
  }), {
    info: {
      summary: `## Description
                SnButtons can also be styled as circles with either icons or text.`,
      components: { SnButton }
    }
  })
  .add('Display Buttons', () => ({
    components: { SnButton, SnIcon },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      outline: {
        default: boolean('Outline', false)
      },
      buttonType: {
        default: radios(buttonTypeLabel, buttonTypeOptions, buttonTypeDefault)
      },
      preicon: {
        default: boolean('Prepend Icon', false)
      },
      appicon: {
        default: boolean('Append Icon', false)
      }
    },
    template: `
        <sn-button
          display
          :prepend-icon="prependIcon"
          :append-icon="appendIcon"
          :primary="primary"
          :secondary="secondary"
          :accent="accent"
          :caution="caution"
          :warning="warning"
          :disabled="disabled"
          :outline="outline"
          @click="action"
        >
          Button
        </sn-button>
    `,
    methods: { action: action('clicked') },
    computed: {
      ...computedButtonType,
      prependIcon () {
        return this.preicon ? 'search' : false
      },
      appendIcon () {
        return this.appicon ? 'search' : false
      }
    }
  }), {
    info: {
      summary: `The \`display\` prop will make the button and text larger.
                Display buttons can be styled like a standard size button`,
      components: { SnButton }
    }
  })
