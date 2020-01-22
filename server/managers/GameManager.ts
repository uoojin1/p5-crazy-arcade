import io from 'socket.io'
import random from 'lodash/random'

type KeysPressed = {
  l: false,
  r: false,
  u: false,
  d: false
}

type Position = {
  x: number,
  y: number
}

type Color = {
  r: number,
  g: number,
  b: number
}

type Player = {
  id: string,
  position: Position,
  color: Color,
  keysPressed: KeysPressed
}

type PlayersList = {
  [key: string]: Player
}

export class GameManager {
  // list (map) of all players
  private playersList: PlayersList

  public constructor() {
    // initialize the players list to an empty map
    this.playersList = {}
  }

  /**
   * Function that initializes a newly connected player's environment
   * @param socket the newly connected socket
   */
  public initializePlayer(socket: io.Socket) {
    console.log(`new connection: ${socket.id}. Creating new player`)
    // player ID is same as his socket id
    const playerId = socket.id
    // create a new player
    const newPlayer = this.createPlayer(playerId)
    // add the new player to the players list
    this.addPlayerToList(newPlayer)
    // give the initial settings to the new user
    socket.emit('initialized game for the new user', {
      allPlayers: this.playersList,
      yourCharacter: newPlayer
    })
    // broadcast the new user's entry to all users
    socket.broadcast.emit('new player has joined', newPlayer)
  }

  public removePlayer(socket: io.Socket) {
    console.log(`connection lost: ${socket.id}. Removing player`)
    // remove the player from the players list
    this.removePlayerFromList(socket.id)
    // broadcast to all players
    socket.broadcast.emit('player disconnected', socket.id)
  }

  public handleKeysPressedChange(socket: io.Socket, data: {
    keysPressed: KeysPressed,
    position: Position
  }) {
    // update the latest keysPressed for the updated user
    this.playersList[socket.id].keysPressed = data.keysPressed
    this.playersList[socket.id].position = data.position
    // need to broadcast this information
    socket.broadcast.emit('pressedKeys changed', {
      id: socket.id,
      ...data
    })
  }

  private addPlayerToList(player: Player) {
    this.playersList[player.id] = player
  }

  private removePlayerFromList(id: string) {
    delete this.playersList[id]
  }

  private createPlayer(id: string): Player {
    return {
      id,
      position: {
        x: random(50, 550),
        y: random(50, 550)
      },
      color: {
        r: random(0, 255),
        g: random(0, 255),
        b: random(0, 255)
      },
      keysPressed: {
        l: false,
        r: false,
        u: false,
        d: false
      }
    }
  }
  
}
