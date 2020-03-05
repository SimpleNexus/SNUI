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
