
export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Anti Algorithmic Music' || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/scss/styleGuide.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],
  router: {
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:4000/',
    credentials: false
  },
  env: {
    apiUrl: 'http://localhost:4000/api'
  },
  //Auth form
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/api/user/me', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  /*
  ** Add scss
  */
  styleResources: {
    scss: ['/assets/scss/*.scss']
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
