import * as components from'./components'

const componentList = components.default
const snuiComponents = {
  install (Vue) {
    Object.keys(componentList).forEach(name => {
      Vue.component(name, componentList[name])
    })
  }
}

export default snuiComponents