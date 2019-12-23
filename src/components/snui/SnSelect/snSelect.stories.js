import { storiesOf } from '@storybook/vue'
import SnSelect from './SnSelect'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Vue from 'vue'
import ClickOutside from '../../../directives/clickOutside'

Vue.directive('click-outside', ClickOutside)

storiesOf('SnSelect', module)
  .add('Basic Select', () => ({
    components: { SnSelect },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      returnObject: {
        default: boolean('Return Object (see Actions tab)', false)
      }
    },
    data () {
      return {
        defaultVal: 'Initial Value',
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Initial Value'
        ]
      }
    },
    methods: {
      logInput: action('input changed')
    },
    template: `
      <sn-select
        v-model="defaultVal"
        :items="items"
        :disabled="disabled"
        :return-object="returnObject"
        @input="logInput"
      />`
  }), {
    info: {
      summary: `
      A basic select box takes an array of items that are either primitives or objects. If objects are supplied,
      it is advised to use the \`item-text\` and \`item-value\` props to tell the component which properties to
      display and bind to the field.
      `
    }
  })
  .add('With Avatar', () => ({
    components: { SnSelect },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      returnObject: {
        default: boolean('Return Object (see Actions tab)', false)
      }
    },
    data () {
      return {
        defaultVal: {
          text: 'Item 1',
          value: 'item1',
          avatar: 'https://i.pravatar.cc/300'
        },
        items: [{
          text: 'Item 1',
          value: 'item1',
          avatar: 'https://i.pravatar.cc/300'
        },
        {
          text: 'Item 2',
          value: 'item2',
          avatar: 'https://i.pravatar.cc/300'
        }
        ]
      }
    },
    methods: {
      logInput: action('input changed')
    },
    template: `
      <sn-select
        v-model="defaultVal"
        avatar
        :items="items"
        :disabled="disabled"
        :return-object="returnObject"
        @input="logInput"
      />`
  }), {
    info: {
      summary: `When given the avatar prop, the select field will render an avatar with each option in the select list.
                To specify which object property should be used as the avatar image source, supply an \`item-avatar\`
                prop to the component. If the avatar image fails to load, the component will fall back to the \`item-text\`
                prop value to render initials.`
    }
  })
  .add('With Icon', () => ({
    components: { SnSelect },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      returnObject: {
        default: boolean('Return Object (see Actions tab)', false)
      }
    },
    data () {
      return {
        defaultVal: {
          text: 'Item 1',
          value: 'item1',
          icon: 'house'
        },
        items: [{
          text: 'Item 1',
          value: 'item1',
          icon: 'house'
        },
        {
          text: 'Item 2',
          value: 'item2',
          icon: 'airplane'
        }
        ]
      }
    },
    methods: {
      logInput: action('input changed')
    },
    template: `
      <sn-select
        v-model="defaultVal"
        icon
        :items="items"
        :disabled="disabled"
        :return-object="returnObject"
        @input="logInput"
      />`
  }), {
    info: {
      summary: `
      When given the icon prop, the component will render an icon with each option in the select list.
      To specify which object property should be used as the icon name, supply an \`item-icon\`
      prop to the component. Please note that the icon name should exist in the sn-icon font.
      `
    }
  })
  .add('With Sorting', () => ({
    components: { SnSelect },
    props: {
      disabled: {
        default: boolean('Disabled', false)
      },
      returnObject: {
        default: boolean('Return Object (see Actions tab)', false)
      }
    },
    data () {
      return {
        defaultVal: {
          text: 'A - Z',
          value: 'a-z'
        },
        items: [{
          text: 'A - Z',
          value: 'a-z'
        },
        {
          text: 'Z - A',
          value: 'z-a'
        }
        ]
      }
    },
    methods: {
      logInput: action('input changed')
    },
    template: `
      <sn-select
        v-model="defaultVal"
        :items="items"
        :disabled="disabled"
        :return-object="returnObject"
        @input="logInput"
        sorting
      />`
  }), {
    info: {
      summary: `
      When given the \`sorting\` prop, the component will prepend the 'SORT:' flag to the selected item
      to indicate that the items are meant for changing a sort order.
      `
    }
  })
