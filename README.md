# ESBuild Svelte Inertia Plugin

This plugin enables importing all the pages component to pass it to resolve function of Inertia.

## Installation

```bash
yarn add esbuild-svelte-inertia
```

```js
# esbuild.config.js
const svelteInertiaPlugin = require("esbuild-svelte-inertia")

esbuid.build({
  ...
  plugins: [sveltePlugin(), svelteInertiaPlugin()],
})
```

## Example usage

```js
import * as pages from "./Pages/**/*"
```

```js
createInertiaApp({
  resolve: name => pages[name.replace("/", "")],
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
```

## 🙏 Contributing

If you have an issue you'd like to submit, please do so using the issue tracker in GitHub. In order for us to help you in the best way possible, please be as detailed as you can.


## 📝 License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

