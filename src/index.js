import * as components from './components/snui'
import Vue from 'vue'

export default {
  install () {
    for (const key in components) {
      const component = components[key]
      if (component) {
        Vue.component(key, component)
      }
    }
  }
}
