/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator, addParameters } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import centered from '@storybook/addon-centered/vue'
import snTheme from './snTheme'

import '../../src/themes/main.styl'

addDecorator(withInfo)
addDecorator(centered)
addDecorator(withKnobs)

addParameters({
  options: {
    theme: snTheme
  }
})

const req = require.context('../../src/', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
