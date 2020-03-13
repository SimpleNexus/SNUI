import { storiesOf } from '@storybook/vue'
import SnSuspense from './SnSuspense'
import SnButton from '../SnButton/SnButton'

storiesOf('SnSuspense', module).add('Example', () => ({
  components: { SnSuspense, SnButton },
  data () {
    return {
      suspend: true
    }
  },
  mounted () {
    this.triggerSuspend()
  },
  methods: {
    triggerSuspend () {
      this.suspend = true
      setTimeout(() => { this.suspend = false }, 3000)
    }
  },
  template: `
    <!-- Just a wrapper for sizing purposes -->
    <div style="max-width: 500px;" class="snui">
      <sn-suspense :suspend="suspend">
        <!-- We just place whatever async content we need inside the slot -->
        <div class="sn-text-primary sn-body" style="text-align: center;">Hello World!</div>
        <br />
        <sn-button @click="triggerSuspend">Suspend</sn-button>
      </sn-suspense>
    </div>
    `
}), {
  info: {
    summary: `
      SnSuspense provides a way to elegantly provide a loading state for you components.
      When the suspend prop is true, the component will render a loading animation until
      the prop changes to false. When false, the component will render whatever is in the default slot.

      This makes it very easy to place async data inside of a suspend component and forget about handling the loading
      state entirely.
    `,
    components: { SnSuspense },
    source: true
  }
})
