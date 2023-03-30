import { io } from 'socket.io-client'

const ws = io('http://localhost:3333', {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

export default ws