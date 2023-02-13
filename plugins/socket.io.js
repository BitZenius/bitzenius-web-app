import io from 'socket.io-client'

export default function ({ $axios, store }, inject) {
  (async () => {
    const currentUser = await store.$fire.auth.currentUser
    
    if (currentUser) {
      const token = await store.$fire.auth.currentUser.getIdToken()
      console.log('token', token);
    }

    const balanceSocket = io.connect(process.env.SOCKET_URL, {
      path: '/balance/',
      auth: { token }
    })

    const notificationSocket = io.connect(process.env.SOCKET_URL, {
      path: '/cron-notification/',
      auth: { token }
    })

    inject('balanceSocket', balanceSocket)
    inject('notificationSocket', notificationSocket)
  })()
}