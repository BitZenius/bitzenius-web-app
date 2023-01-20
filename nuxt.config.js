import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - BitZenius',
    title: 'The best investment tools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;0,900;1,300;1,400;1,600;1,700;1,900&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/apexchart',
    '~/plugins/test',
    '~/plugins/socketio',
    '~/plugins/vue2-filters'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/moment',
    // https://firebase.nuxtjs.org
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyDKrjb-Epw_u_iZ_uxS7u4Uc6ptBzxheeI",
          authDomain: "bitzenius-dev.firebaseapp.com",
          projectId: "bitzenius-dev",
          storageBucket: "bitzenius-dev.appspot.com",
          messagingSenderId: "504024137179",
          appId: "1:504024137179:web:1ea51f3c23b571fbcafbfe"
          // measurementId: 'G-QF8GLLXCM6'
        },
          services: {
            auth: {
              persistence: 'local',
              initialize: {
                onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
                onAuthStateChangedAction: 'onAuthStateChangedAction',
                subscribeManually: false
              },
              ssr: false
              // emulatorPort: 9099,
              // emulatorHost: 'http://localhost'
          },
          firestore: {
            enablePersistence: true
            // emulatorPort: 8080,
            // emulatorHost: 'http://localhost'
          },
          storage: true
        }
      }
    ]
  ],

  router: {
    middleware: ['authentication'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          customGreen:"#C3F239",
          customPink:"#FE759F",
          primary: '#3394F8',
          danger: '#ff002f',
          basic:'#312d4b',
          'basic-1': '#177e89',
          'basic-2':'#312d4b',
        },
        light: {
          customGreen:"#C3F239",
          customPink:"#FE759F",
          primary: '#3394F8',
          danger: '#ff002f',
          basic:'#ffffff',
          'basic-1': '#ffffff',
          'basic-2': '#ffffff',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel:{
      plugins: [
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  },
  env: {
    // @todo setup github actions secret with ENV
    SERVER: process.env.SERVER ? process.env.SERVER : "https://bitzenius-rest-server-dev-onhwa.ondigitalocean.app",
    API_URL: process.env.SERVER ? process.env.SERVER : "https://bitzenius-rest-server-dev-onhwa.ondigitalocean.app",
    SOCKET_URL: process.env.SERVER ? process.env.SERVER : "https://bitzenius-rest-server-dev-onhwa.ondigitalocean.app",
    BOT_ID: process.env.BOT_ID
  }
}
