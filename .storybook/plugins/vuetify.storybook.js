import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// CSS
import '../src/assets/css/overrides.sass'
// import '../src/assets/css/snIcons.css'
import '../src/assets/css/index.scss'
// import '../src/assets/css/storybook/index.scss'
import * as colorVariables from '../src/assets/css/snui/_snColorVariables.scss'

// import * as svgIcons from '~/components/snui/v2/snIcons/icons/index.js'
// eslint-disable-next-line
// const snIcons = Object.keys(svgIcons).reduce((dict, iconName) => ({ ...dict, [`${iconName}`]: { component: svgIcons[iconName] } }), {})
// const snThemeColors = Object.keys(colorVariables).reduce((dict, colorName) => ({ ...dict, [colorName]: colorVariables[colorName] }), {})

Vue.use(Vuetify)

const opts = {
  // icons: {
  //   values: {
  //     ...snIcons
  //   }
  // },
  theme: {
    themes: {
      light: {
        primary: '#FFFFFF',
        ...snThemeColors
      },
      dark: {
        tertiary: '#1F1F1F',
        ...snThemeColors
      }
    }
  }
}

export default new Vuetify(opts)
