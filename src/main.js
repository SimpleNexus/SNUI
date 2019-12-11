import Vue from 'vue'
import SNUI from './index'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(SNUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
