import snTooltip from './snTooltip.vue'

export default {
  title: 'Messages/Tooltip',
  component: snTooltip,
  argTypes: {
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right']
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { snTooltip },
  props: Object.keys(argTypes),
  template: `
  <v-container fluid class="mt-12">
    <v-row justify="center"><div class="sn-h2">Configurable tooltip</div></v-row>
    <v-row justify="center" class="my-12">
      <sn-tooltip attach v-bind="$props">
        <template v-slot:activator>
          <div v-html="activator" class="sn-body-1"></div>
        </template>
        <div v-html="defaultSlot" class="sn-body-2" style="color: white;"></div>
      </sn-tooltip>
    </v-row>

    <v-row justify="center"><div class="sn-h2 mt-10">Icon tooltip examples</div></v-row>
    <v-row justify="center" class="my-12">
      <div class="mx-12">
        <sn-tooltip attach direction="left">
          <template v-slot:activator>
            <v-icon color="#1F1F1F" large>$snApartment</v-icon>
          </template>
          <div class="sn-body-2" style="color: white;">This is a cool apartment</div>
        </sn-tooltip>
      </div>
      <div class="mx-12">
        <sn-tooltip attach direction="top">
          <template v-slot:activator>
            <v-icon color="#1F1F1F" large>$snMusic</v-icon>
          </template>
          <div class="sn-body-2" style="color: white;"><v-icon color="white">$snWarning</v-icon> Music may be loud</div>
        </sn-tooltip>
      </div>
      <div class="mx-12">
        <sn-tooltip attach direction="bottom">
          <template v-slot:activator>
            <v-icon color="#1F1F1F" large>$snQuestionMark</v-icon>
          </template>
          <div class="sn-body-2" style="color: white;">Why are you hovering over this?</div>
        </sn-tooltip>
      </div>
      <div class="mx-12">
        <sn-tooltip attach direction="right">
          <template v-slot:activator>
            <v-icon color="#1F1F1F" large>$snPeopleShare</v-icon>
          </template>
          <div class="sn-body-2" style="color: white;">Sharing</div>
        </sn-tooltip>
      </div>
    </v-row>

    <v-row justify="center"><div class="sn-h2 mt-10">Additional tooltip examples</div></v-row>
    <v-row justify="center" class="my-12">
      <div class="mx-12">
        <sn-tooltip attach direction="left">
          <template v-slot:activator>
            <div class="px-6 py-2 sn-body-1" style="border: 1px solid #1F1F1F">Tooltips</div>
          </template>
          <div class="sn-body-2" style="color: white;">More info about tooltips</div>
        </sn-tooltip>
      </div>
      <div class="mx-12">
        <sn-tooltip attach>
          <template v-slot:activator>
            <a href="https://simplenexus.com" style="color: blue" target="_blank">Link</a>
          </template>
          <div class="sn-body-2" style="color: white;">Some information about where the link takes you</div>
        </sn-tooltip>
      </div>
    </v-row>
  </v-container>
  `
})

export const Tooltip = Template.bind({})
Tooltip.args = {
  direction: 'top',
  activator: '<div>Text that needs a tooltip</div>',
  defaultSlot: '<div>Here is a tooltip!</div>',
  disabled: false
}
