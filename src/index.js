import * as components from './components/snui'
import cssVars from 'css-vars-ponyfill'
import { setBrandColor } from './util/setBrandColor'
import { hexToRgb } from './util/hexToRgb'
import ClickOutside from './directives/clickOutside'

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

    Vue.directive('click-outside', ClickOutside)
  }
}
