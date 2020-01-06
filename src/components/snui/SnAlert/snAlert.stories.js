import { storiesOf } from '@storybook/vue'
import SnAlert from './SnAlert'
import { boolean, radios, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

const alertTypeLabel = 'Alert Type'
const alertTypeOptions = {
  Primary: 'primary',
  Success: 'success',
  Caution: 'caution',
  Warning: 'warning'
}
const alertTypeDefault = 'primary'
const computedAlertType = {
  success () {
    return this.alertType === 'success'
  },
  primary () {
    return this.alertType === 'primary'
  },
  caution () {
    return this.alertType === 'caution'
  },
  warning () {
    return this.alertType === 'warning'
  }
}

storiesOf('SnAlert', module)
  .add('Basic Alert', () => ({
    components: { SnAlert },
    props: {
      alertType: {
        default: radios(alertTypeLabel, alertTypeOptions, alertTypeDefault)
      },
      dismissible: {
        default: boolean('Dismissible', false)
      },
      actionText: {
        default: text('Action Text', 'EXAMPLE')
      },
      text: {
        default: text('Alert Text', 'This is an alert')
      }
    },
    computed: {
      ...computedAlertType
    },
    data () {
      return {
        show: true
      }
    },
    methods: {
      actionClicked: action('Action Clicked'),
      dismissed () {
        action('Dismissed')(arguments)
        setTimeout(() => {
          this.show = true
        }, 2000)
      }
    },
    template: `
      <sn-alert
        v-model="show"
        :dismissible="dismissible"
        :primary="primary"
        :caution="caution"
        :warning="warning"
        :success="success"
        @dismissed="dismissed"
        @actionClicked="actionClicked"
      >
          <span>
            {{text}}
          </span>
        <span slot="action">{{actionText}}</span>
      </sn-alert>`
  }), {
    info: {
      summary: `
        A simple Alert component used to display messages to users.

        The component can be bound to a boolean value that determines whether or not it is shown.
        It uses v-show under the hood, so it will be rendered but with the css \`display: false\`

        The component provides two slots, the default slot and the action slot.

        The default slot should be passed the message text for the alert.

        The action slot should be passed action text (UNDO, REDO, TRY AGAIN, etc). The component will emit an event when this action text is clicked so the parent component can perform said action.
      `
    }
  })
