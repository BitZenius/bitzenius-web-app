
export default function ({ $axios, store, router }, inject) {
  (async () => {
    const currentUser = await store.$fire.auth.currentUser
    let api = $axios.create()
    if (currentUser) {
      const token = await store.$fire.auth.currentUser.getIdToken();
      console.log('token', token);
      store.commit('setToken', token);
      api = $axios.create({
        headers: {
          common: {
            Accept: 'text/plain, */*',
            authorization: `Bearer ${token}`
          }
        }
      })
    }

    api.setBaseURL(process.env.API_URL)
    // do from error response
    // error.code == 'auth/id-token-revoked'
    api.onError((error) => {
      if (error.response.status === 401) {
        if (store.getters.isLoggedIn) {
          // user should re-login
          store.$fire.auth.signOut().then(() => {
            store.$router.push('/signin')
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    })

    inject('api', api)
  })()
}
