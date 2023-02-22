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
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api',
    '~/plugins/axios',
    '~/plugins/apexchart',
    '~/plugins/test',
    '~/plugins/socketio',
    '~/plugins/vue2-filters',
    '~/plugins/clipboard',
    '~/plugins/vue-qr-code',
    '~/plugins/mixin',
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
    '@nuxtjs/svg',
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
    optionsPath: './vuetify.config.js',
    theme: {
      options: { customProperties: true },
      dark: true,
      themes: {
        dark: {
          customGreen: "#C3F239",
          customGreen2: "#27d79e",
          customPink: "#FE759F",
          customYellow: "#FEE603",
          primary: '#3394F8',
          primary2: '#46A0F8',
          danger: '#FF6469',
          success: '#1AD598',
          'success-light': "#d1f7ea",

          basic: '#000000',
          'basic-1': '#000000',
          'basic-2': '#000000',
          'basic-text': '#ffffff',

          // BG
          'off-white': '#1D1F2B',
          'off-white-2': '#282B3D',
          'off-white-3': '#212434',

          // TEXT
          'primary-text': "#ffffff"
        },
        light: {
          customGreen: "#C3F239",
          customGreen2: "#27d79e",
          customPink: "#FE759F",
          customYellow: "#FEE603",
          primary: '#3394F8',
          primary2: '#46A0F8',
          danger: '#FF6469',
          success: '#1AD598',
          'success-light': "#d1f7ea",

          basic: '#ffffff',
          'basic-1': '#ffffff',
          'basic-2': '#ffffff',
          'basic-text': '#000000',

          // BG
          'off-white': '#f4f7fd',
          'off-white-2': '#f4f7fd',
          'off-white-3': '#ffffff',

          // TEXT
          'primary-text': "#ffffff"
        }
      }
    },


  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
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

/**
 * Color pallete:
 *
 * #3795f3
 * #dfebf9
 * #7ed1b7
 * #c9ec3b
 * #f17c9b
 * #222222
 * #2B2B2B
 */
