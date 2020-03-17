# SNUI

## Description
The SimpleNexus Component Library for Vue.js. 

See our Storybook for component details and examples
[SNUI Storybook](https://simplenexus.dev/SNUI)

See our GitHub for source
https://github.com/SimpleNexus/SNUI

To get started, run 
`yarn add @simplenexus/snui` to your Vue application

Place the following in a `plugins/snui.js` file or in your Vue app's entry point file:
```js
import Vue from 'vue'
import SNUI from '@simplenexus/snui'
import '@simplenexus/snui/dist/SNUI.css'

Vue.use(SNUI)
``` 

This will make the SNUI components available in your template without needing to
import them manually. 

Please note that SNUI is still in development and not all components are available for use.

The currently available components are:

* SnButton
* SnTextField

# SN Setup Notes

Ensure that the SNUI package is properly imported and applied in your js pack file. A correct configuration should look like this:

```js
import Vue from 'vue
import SNUI from '@simplenexus/snui'
import '@simplenexus/snui/dist/SNUI.css'

Vue.use(SNUI)
```

Now SNUI will be attached the vue instance.

To minimize conflicts with Vuetify stylings, we have namespaced all the SNUI css to be under the `snui` css class. 
This means that you should place `class=”snui”` on whatever your root component is. The `snui` class will set the body 
font to Barlow, and provide typography and color helpers as defined in the Storybook

## Development

### Project setup
```
yarn install
```

### Compiles and loads Storybook for development
```
yarn run storybook:serve
```

### Compiles and minifies for production
```
yarn build:lib
```

### Lints and fixes files
```
yarn lint
```

[SNUI Storybook]: https://simplenexus.dev/SNUI
