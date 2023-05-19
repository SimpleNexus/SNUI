/** @type { import('@storybook/vue-vite').Preview } */

import vuetify from './plugins/vuetify.storybook'

const preview = {
  decorators: [
    () => ({
      vuetify,
      template:'<v-app><story/></v-app>'
    })
  ]
}

export default preview
