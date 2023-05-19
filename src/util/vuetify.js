import Vue from 'vue'
import Vuetify from 'vuetify'

import * as svgIcons from '~/components/snIcons/icons/index.js'
// eslint-disable-next-line
const snIcons = Object.keys(svgIcons).reduce((dict, iconName) => ({ ...dict, [`${iconName}`]: { component: svgIcons[iconName] } }), {})

Vue.use(Vuetify)

const opts = {
  breakpoint: {
    thresholds: {
      xs: 320,
      sm: 540,
      md: 990,
      lg: 1280
    },
    // ignores scrollbar to match breakpoints with css @media
    scrollBarWidth: -1
  },
  icons: {
    values: {
      ...snIcons
    }
  }
}

export default new Vuetify(opts)
