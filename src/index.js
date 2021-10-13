const path = require("path")
const glob = require("glob").sync

const resolver = async (args) => {
  return {
    path: path.resolve(args.resolveDir, args.path),
    namespace: 'svelte-inertia',
    pluginData: {
      path: args.path,
      resolveDir: args.resolveDir,
    }
  }
}

const svelteInertiaPlugin = () => {
  return {
    name: "svelte-inertia",
    setup: build => {
      build.onResolve({filter: /\*/}, resolver)
      build.onLoad({ filter: /.*/, namespace: 'svelte-inertia'}, async (args) => {
        const files =
          glob(`${args.pluginData.path}.svelte`, {cwd: args.pluginData.resolveDir})
          const pages = files.map(file => {
            const name = file.replace(/\.\/Pages\//, '').replace("/", "").replace(/\.svelte$/, '')
            return {
              name,
              path: file,
            }
          })

        const importerCode = `
          ${pages.map(page => `export const ${page.name} = require('${page.path}')`).join('\n')}
        `
        return {contents: importerCode, resolveDir: args.pluginData.resolveDir};
      })
    }
  }
}

module.exports = svelteInertiaPlugin