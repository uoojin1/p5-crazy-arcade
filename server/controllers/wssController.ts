import * as io from 'socket.io'

export function wssController(server: io.Server) {
  server.on('connection', (socket: io.Socket) => {
    console.log('New connection', socket.id)
    socket.broadcast.emit('message', `new connection: ${socket.id}`)
  })
}
