export const state = () => ({
  title: 'Zoku Bot',
  authUser: null,
  theme: 'dark',
  isLoading: false,
  snackbar: {
    show: false,
    message: null,
    color: null
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
      console.log('store authUser', authUser);
      const { uid, email, phoneNumber, displayName, photoURL, emailVerified, refreshToken } = authUser
      const { admin, premium } = claims
      state.authUser = { uid, email, phoneNumber, displayName, photoURL, emailVerified, admin, premium }
      // PREMIUM -> to SUBSCRIPTION_DATE (if value exist = true otherwise false)
    } else {
      state.authUser = null
    }
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
    console.log('store theme ', theme);
    state.theme = theme
  },
  setIsLoading(state, cond) {
    state.isLoading = cond;
  },
  setShowSnackbar(state, cond) {
    state.snackbar = cond;
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
