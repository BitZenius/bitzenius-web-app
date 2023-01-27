export const state = () => ({
  title: 'BitZenius',
  authUser: null,
  subscription: null,
  token: null,
  theme: 'dark',
  isLoading: false,
  snackbar: {
    show: false,
    message: null,
    color: null
  },
  globalCss: {
    topMargin: 0
  }
})

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      const { uid, email, phoneNumber, displayName, photoURL, emailVerified, refreshToken } = authUser
      const { trial, subscription } = claims
      state.authUser = { uid, email, phoneNumber, displayName, photoURL, emailVerified, trial, subscription }
    } else {
      state.authUser = null
    }
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser (state, user) {
    state.authUser = {
      ...state.authUser,
      ...user
    }
  },
  setTitle (state, title) {
    state.title = title
  },
  setTheme(state, theme) {
    state.theme = theme
  },
  setIsLoading(state, cond) {
    state.isLoading = cond;
  },
  setShowSnackbar(state, cond) {
    state.snackbar = cond;
  },
  setSubscription(state, subscription) {
    state.subscription = subscription;
  },
  setGlobalCss(state, globalCss) {
    state.globalCss = {
      ...state.globalCss,
      ...globalCss
    }
  }
}

export const getters = {
  isLoggedIn: (state) => {
    try {
      return state.authUser.uid !== null
    } catch {
      return false
    }
  },
  isEmailVerified: (state) => {
    try {
      return state.authUser.emailVerified !== false
    } catch {
      return false
    }
  },
  theme: (state) => {
    return state.theme
  },
  isLoading: (state) => {
    return state.isLoading
  },
  snackbar: (state) => {
    return state.snackbar
  }
}
