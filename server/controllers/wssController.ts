import io from 'socket.io'
import random from 'lodash/random'

let players: Object = {}

function createPlayer(id: string) {
  return {
    id,
    x: random(50, 550),
    y: random(50, 550),
    color: [random(0, 255), random(0, 255), random(0, 255)]
  }
}

export function wssController(server: io.Server) {
  server.on('connection', (socket: io.Socket) => {
    console.log('on connection', socket.id)
    const id = socket.id
    const player = createPlayer(id)
    players[id] = player
    // send player's position back to the sender
    socket.emit('player created', {
      allPlayers: players,
      yourCharacter: player
    })

    socket.broadcast.emit('new player joined', player)

    socket.on('message', (data) => { console.log(data) })

    socket.on('send position change', (p: any) => {
      // need to keep the location of each player from the server
      console.log('send position change', p)
      // FIXME: should ignore self
      socket.broadcast.emit('player position change', { id: socket.id, x: p.x, y: p.y })
    })

    socket.on('disconnect', () => {
      delete players[id]
      socket.broadcast.emit('player disconnected', socket.id)
    })
  })
}
