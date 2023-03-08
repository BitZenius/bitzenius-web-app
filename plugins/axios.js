
export default function ({ $axios, store }, inject) {
    (async () => {
        let axios = $axios.create()

        axios.onError((error) => {
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

        inject('axios', axios)
    })()
}
