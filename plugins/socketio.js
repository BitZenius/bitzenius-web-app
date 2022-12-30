import io from 'socket.io-client'
export default async ({ app, store }, inject) => {
    const socket = io('https://bitzenius-rest-server-dev-l7vwn.ondigitalocean.app/')
    inject('socket', socket)
}