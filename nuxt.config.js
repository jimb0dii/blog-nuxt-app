const bodyParser = require('body-parser')
const axios = require('axios')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000', duraction: 5000 },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/date-filter.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Nuxt.js environment variables
   */
  env: {
    firebaseApiKey: 'AIzaSyBekN7nddAmFice8CGN9RcOx9S5Wp0iLZg'
  },
  /*
   ** Nuxt.js default page transitions
   */
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // router: {
  //   middleware: 'log'
  // }
  serverMiddleware: [bodyParser.json(), '~/api'],
  generate: {
    routes() {
      return axios
        .get('https://nuxt-blog-app-99a59.firebaseio.com/posts.json')
        .then((res) => {
          const routes = []
          for (const key in res.data) {
            routes.push({
              route: `/posts/${key}`,
              payload: { postData: res.data[key] }
            })
          }
          return routes
        })
    }
  }
}
