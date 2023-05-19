import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// CSS
import '~/assets/css/overrides.sass'
import '~/assets/css/index.scss'

import * as svgIcons from '~/components/snIcons/icons/index.js'
// eslint-disable-next-line
const snIcons = Object.keys(svgIcons).reduce((dict, iconName) => ({ ...dict, [`${iconName}`]: { component: svgIcons[iconName] } }), {})

Vue.use(Vuetify)

const opts = {
  icons: {
    values: {
      ...snIcons
    }
  }
}

export default new Vuetify(opts)
