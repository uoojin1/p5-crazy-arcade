import io from 'socket.io'
import { GameManager } from '../managers/GameManager'

const gameManager = new GameManager()

export function wssController(server: io.Server) {
  // register event handlers for a new connetion
  server.on('connection', (socket: io.Socket) => {
    gameManager.initializePlayer(socket)
    // register a handler for keysPressed change
    socket.on('report: keysPressed changed', (data) => {
      gameManager.handleKeysPressedChange(socket, data)
    })
    // register bomb handler
    socket.on('report: bomb placed', (data) => {
      gameManager.handleBombPlaced(socket, data)
    })

    // register a handler for a disconnect event
    socket.on('disconnect', () => gameManager.removePlayer(socket))
  })
}
