import io from 'socket.io-client'
export default async ({ app, store }, inject) => {
    const socket = io('http://localhost:4000/')
    inject('socket', socket)
}