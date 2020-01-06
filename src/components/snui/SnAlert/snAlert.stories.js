import { storiesOf } from '@storybook/vue'
import SnAlert from './SnAlert'
import { boolean, radios } from '@storybook/addon-knobs'

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
      }
    },
    computed: {
      ...computedAlertType
    },
    template: `
      <sn-alert
        :dismissible="dismissible"
        :primary="primary"
        :caution="caution"
        :warning="warning"
        :success="success"
      >
        <span>This is an alert</span>
        <span slot="action">undo</span>
      </sn-alert>`
  }))
