import * as components from './components/snui'
import cssVars from 'css-vars-ponyfill'
import { hexToRgb, setBrandColor } from './util/colorUtils'
import ClickOutside from './directives/clickOutside'
import { animationLibrary } from './util/animations/animationLibrary'
import SnMask from './directives/snMask'
import './themes/main.styl'

export default {
  install (Vue, options) {
    // Ponyfill for css variables in ie11
    cssVars({
      onlyLegacy: true,
      watch: true
    })
    // Attach SNUI components to the Vue instance
    for (const key in components) {
      const component = components[key]
      if (component) {
        Vue.component(key, component)
      }
    }
    // provide a $snui object which can be used to
    // set color variables
    Vue.prototype.$snui = {
      hexToRgb,
      setBrandColor
    }

    Vue.directive('sn-click-outside', ClickOutside)
    Vue.directive('sn-mask', SnMask)
  }
}

export {
  setBrandColor,
  animationLibrary
}
