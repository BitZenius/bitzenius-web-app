
export default function ({ $axios, store }, inject) {
  (async () => {
    const currentUser = await store.$fire.auth.currentUser
    let api = $axios.create()
    if (currentUser) {
      const token = await store.$fire.auth.currentUser.getIdToken()
      console.log('token', token);
      api = $axios.create({
        headers: {
          common: {
            Accept: 'text/plain, */*',
            authorization: `Bearer ${token}`
          }
        }
      })
    }
    console.log("ENV SERVER", process.env.SERVER);
    api.setBaseURL(process.env.SERVER)
    inject('api', api)
  })()
}
