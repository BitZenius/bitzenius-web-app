export default function ({ $axios, store, router }, inject) {
  (async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentUser = await store.$fire.auth.currentUser
    let api = $axios.create()

    if (currentUser) {
      const token = await store.$fire.auth.currentUser.getIdToken();
      store.commit('setToken', token)
      api = $axios.create({
        headers: {
          common: {
            Accept: 'text/plain, */*',
            authorization: `Bearer ${token}`,
            timezone
          }
        }
      })
    }

    api.setBaseURL(process.env.API_URL)
    api.onError((error) => {
      const config = error.response.config
      const data = error.response.data
      
      if (store.getters.isLoggedIn && config && data.status === 401 && data.code) {
        switch(data.code) {
          case 'auth/id-token-expired':
            store.$fire.auth.currentUser.getIdToken(true).then((newToken) => {
              config.headers.authorization = `Bearer ${newToken}`
              store.commit('setToken', newToken)
              $axios.request(config)
            }).catch((err) => {
              console.log(err)
            })
          break

          default:
            store.$fire.auth.signOut().then(() => {
              store.$router.push('/signin')
            }).catch((err) => {
              console.log(err)
            })
          break
        }
      }
    })

    inject('api', api)
  })()
}