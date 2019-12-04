/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue'
import { withInfo } from 'storybook-addon-vue-info'

addDecorator(withInfo)
const req = require.context('../../src/', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
