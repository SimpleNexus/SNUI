import Vue from 'vue'
import App from './App.vue'
import vuetify from '~/util/vuetify.js'

new Vue({
  render: (h) => h(App),
  vuetify
}).$mount('#app')
