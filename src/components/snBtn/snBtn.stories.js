import { action } from '@storybook/addon-actions'

import SnBtn from './snBtn'

export default {
  title: 'Buttons/Button',
  component: SnBtn,
  argTypes: {
    text: { control: 'text' },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'text']
    },
    size: {
      control: 'select',
      options: ['small', 'standard', 'large', 'x-large', 'full-width']
    },
    prependIcon: { control: 'text' },
    appendIcon: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    warning: { control: 'boolean' },
    dropdown: { control: 'boolean' },
    dropdownOptions: { control: 'object' },
    textCase: {
      control: 'select',
      options: ['uppercase', 'title', 'sentence']
    },
    id: { control: 'text' }
  }
}

const dropdownOptions = [
  {
    label: 'A good option',
    action: 'GOOD_OPTION'
  },
  {
    label: 'An okay option',
    action: 'OKAY_OPTION'
  },
  {
    label: 'A bad option',
    action: 'BAD_OPTION'
  }
]

const buttonTemplate = (args, { argTypes }) => ({
  components: { SnBtn },
  props: Object.keys(argTypes),
  template: `
    <v-container fluid>
      <v-row>
        <v-col md="4">
          <sn-btn v-bind="$props" @click="onClick" />
        </v-col>
      </v-row>
    </v-container>
  `,
  methods: {
    onClick: action('click')
  }
})

const overviewTemplate = (args, { argTypes }) => ({
  components: { SnBtn },
  props: Object.keys(argTypes),
  template: `
    <v-container fluid>
      <h3>General Overview:</h3>
      <v-row>
        <v-col md="12">
          <h4>Small Buttons:</h4>
          <h5>Primary</h5>
          <sn-btn size="small" text="Label" />
          <sn-btn size="small" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="small" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Secondary</h5>
          <sn-btn size="small" type="secondary" text="Label" />
          <sn-btn size="small" type="secondary" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="small" type="secondary" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Disabled</h5>
          <sn-btn size="small" disabled text="Label" />
          <sn-btn size="small" disabled prepend-icon="$snPicture" text="Label" />
          <sn-btn size="small" disabled dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Text</h5>
          <sn-btn size="small" type="text" text="Label" />
          <sn-btn size="small" type="text" prepend-icon="$snPicture" style="margin-left: 8px;" text="Label" />
          <sn-btn size="small" type="text" dropdown :dropdown-options="dropdownOptions" style="margin-left: 8px;" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Text Disabled</h5>
          <sn-btn size="small" type="text" disabled text="Label" />
          <sn-btn size="small" type="text" disabled prepend-icon="$snPicture" style="margin-left: 8px;" text="Label" />
          <sn-btn size="small" type="text" disabled dropdown :dropdown-options="dropdownOptions" style="margin-left: 8px;" text="Label" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <h4>Standard Buttons:</h4>
          <h5>Primary</h5>
          <sn-btn size="standard" text="Label" />
          <sn-btn size="standard" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="standard" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Secondary</h5>
          <sn-btn size="standard" type="secondary" text="Label" />
          <sn-btn size="standard" type="secondary" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="standard" type="secondary" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Disabled</h5>
          <sn-btn size="standard" disabled text="Label" />
          <sn-btn size="standard" disabled prepend-icon="$snPicture" text="Label" />
          <sn-btn size="standard" disabled dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Text</h5>
          <sn-btn size="standard" type="text" text="Label" />
          <sn-btn size="standard" type="text" prepend-icon="$snPicture" style="margin-left: 8px;" text="Label" />
          <sn-btn size="standard" type="text" dropdown :dropdown-options="dropdownOptions" style="margin-left: 8px;" text="Label" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <h4>Large Buttons:</h4>
          <h5>Primary</h5>
          <sn-btn size="large" text="Label" />
          <sn-btn size="large" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="large" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Secondary</h5>
          <sn-btn size="large" type="secondary" text="Label" />
          <sn-btn size="large" type="secondary" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="large" type="secondary" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Disabled</h5>
          <sn-btn size="large" disabled text="Label" />
          <sn-btn size="large" disabled prepend-icon="$snPicture" text="Label" />
          <sn-btn size="large" disabled dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <h4>X-Large Buttons:</h4>
          <h5>Primary</h5>
          <sn-btn size="x-large" text="Label" />
          <sn-btn size="x-large" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="x-large" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Secondary</h5>
          <sn-btn size="x-large" type="secondary" text="Label" />
          <sn-btn size="x-large" type="secondary" prepend-icon="$snPicture" text="Label" />
          <sn-btn size="x-large" type="secondary" dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
        <v-col md="12">
          <h5>Disabled</h5>
          <sn-btn size="x-large" disabled text="Label" />
          <sn-btn size="x-large" disabled prepend-icon="$snPicture" text="Label" />
          <sn-btn size="x-large" disabled dropdown :dropdown-options="dropdownOptions" text="Label" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <h5>Loading</h5>
          <sn-btn size="small" loading text="Label" />
          <sn-btn size="standard" loading text="Label" />
          <sn-btn size="large" loading text="Label" />
          <sn-btn size="x-large" loading text="Label" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <h5>Warning</h5>
          <sn-btn size="standard" warning dropdown type="primary" text="Label" />
          <sn-btn size="standard" warning prepend-icon="$snPicture" type="secondary" text="Label" />
          <sn-btn size="standard" warning loading text="Label" />
          <sn-btn size="standard" warning disabled text="Label" />
        </v-col>
      </v-row>
    </v-container>
  `,
  methods: {
    onClick: action('click')
  }
})

const defaultArgs = {
  type: SnBtn.props.type.default,
  disabled: false,
  loading: SnBtn.props.loading.default,
  warning: SnBtn.props.warning.default,
  textCase: SnBtn.props.textCase.default,
  text: 'example button',
  dropdown: SnBtn.props.dropdown.default,
  dropdownOptions
}

export const generalOverview = overviewTemplate

export const StandardButton = buttonTemplate.bind({})
StandardButton.args = { ...defaultArgs, size: 'standard' }

export const LargeSecondaryButtonWithIcon = buttonTemplate.bind({})
LargeSecondaryButtonWithIcon.args = { ...defaultArgs, size: 'large', type: 'secondary', prependIcon: '$snPencil' }

export const UnderlinedTextButtonWithIcon = buttonTemplate.bind({})
UnderlinedTextButtonWithIcon.args = { ...defaultArgs, type: 'text', prependIcon: '$snPencil' }
