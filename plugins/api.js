
export default function ({ $axios, store }, inject) {
  (async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentUser = await store.$fire.auth.currentUser
    const api = $axios.create({
      headers: {
        common: {
          Accept: 'text/plain, */*',
          timezone
        }
      }
    })

    api.setBaseURL(process.env.API_URL)

    if (currentUser) {
      if (store.getters.getToken) {
        api.setToken(store.getters.getToken, 'Bearer')
      } else {
        const token = await store.$fire.auth.currentUser.getIdToken()
        store.commit('setToken', token)
        api.setToken(store.getters.getToken, 'Bearer')
      }
    }

    /*
    // for development purpose
    api.onRequest((config) => {
      console.log(config)
    })
    */

    api.onError((error) => {
      const config = error.response.config
      const data = error.response.data
      
      if (store.getters.isLoggedIn && config && data.code) {
        if (data.code == 'auth/id-token-expired') {
          return store.$fire.auth.currentUser.getIdToken(true).then((newToken) => {
            config.headers.authorization = `Bearer ${newToken}`
            store.commit('setToken', newToken)
            return $axios.request(config)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          store.$fire.auth.signOut().then(() => {
            store.$router.push('/signin')
          }).catch((err) => {
            console.log(err)
          })
        }
      }

      return Promise.reject(error)
    })

    inject('api', api)
  })()
}