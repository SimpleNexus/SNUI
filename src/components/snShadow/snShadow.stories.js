import snShadow from './snShadow'

export default {
  title: 'Containers/Shadow',
  component: snShadow,
  argTypes: {
    shadowDepth: {
      control: 'select',
      options: [0, 1, 2, 3, 4]
    }
  }
}

const sourceTemplate = `
  <v-row no-gutters>
    <v-col cols="auto">
      <sn-shadow v-bind="$props">
        <div style="height: 100px; width: 100px;"/>
      </sn-shadow>
    </v-col>
  </v-row>
`

const Template = (_args, { argTypes }) => ({
  components: { snShadow },
  props: Object.keys(argTypes),
  template: sourceTemplate
})
const defaultArgs = {
  shadowDepth: 1
}

export const ShadowCard = Template.bind({})
ShadowCard.args = { ...defaultArgs }
