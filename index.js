


export default {
  dependencies: {
    '@roxi/plugin-preprocess': () => import('@roxi/plugin-preprocess')
  },
  hooks: [
    {
      event: 'start',
      action: async (app, params) => {
        app.merge({
          config: {
            postcss: {
              plugins: []
            }
          }
        })
      }
    },
    {
      event: 'before:bundle',
      action: async (app, params) => {
        const postcss = (await import('rollup-plugin-postcss')).default
        const autoPreprocess = (await import('svelte-preprocess')).default
        const postcssImport = (await import('postcss-import')).default
        const postcssCfg = { plugins: [postcssImport()] }

        app.merge({
          config: {
            rollup: {
              plugins: [
                postcss(postcssCfg)
              ]
            },
            svelte: {
              preprocess: [
                autoPreprocess({
                  postcss: postcssCfg,
                  defaults: { style: 'postcss' }
                })
              ]
            }
          }
        })
      }
    }
  ]
}

