const pkg = require('./package')

const env = {
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000'
}

module.exports = {
  mode: 'universal',
  env,

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ,
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          //import whole set
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          }
        ]
      }
    ],
    '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${env.apiBaseUrl}/graphql`
      },
      ssr: {
        // TODO: should be able to inject. hard coded for now.
        httpEndpoint: `http://gateway.openfaas:8080/function/faas-nuxt-graphql/graphql`
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
