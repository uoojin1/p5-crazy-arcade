import { Bomb } from '../classes/Bomb'
import { Player, ServerPlayerData, Position, KeysPressed } from 'src/classes/Player'
import P5 from 'p5'
import { Constants } from '../constants'

type ServerAllPlayersData = {
  [key: string]: ServerPlayerData
}

type ServerBomb = {
  position: Position,
  plantedTime: number
}

type ServerBombData = ServerBomb[]

type InitialGameData = {
  allPlayers: ServerAllPlayersData,
  yourCharacter: ServerPlayerData,
  bombsData: ServerBombData
}

let c: Constants

export class GameManager {
  // connected socket
  // @ts-ignore
  private socket: SocketIOClient.Socket
  // all bombs
  private bombs: Bomb[]
  // characters
  private myCharacter: Player
  private players: {[key: string]: Player}

  /**
   * constructor for the game manager
   * @param socket the connected soccet
   */
  constructor(socket: SocketIOClient.Socket, p5: P5) {
    socket.on('initialized game for the new user', ({
      allPlayers,
      yourCharacter,
      bombsData
    }: InitialGameData) => {
      // create all players
      Object.keys(allPlayers).forEach((key) => {
        const { id, position, color, keysPressed } = allPlayers[key]
        this.players[id] = new Player(p5, id, position, color, keysPressed)
      })

      // create your character
      const { id, position, color, keysPressed } = yourCharacter
      this.myCharacter = new Player(p5, id, position, color, keysPressed)
      this.players[id] = this.myCharacter

      // create existing bombs
      bombsData.forEach((bomb) => {
        const { position, plantedTime } = bomb
        const untilExplosion = 2500 - (Date.now() - plantedTime)
        this.bombs.push(new Bomb(position.x, position.y, untilExplosion))
      })
    })

    socket.on('new player has joined', (newPlayer: ServerPlayerData) => {
      console.log('new player has joined', newPlayer.id)
      const { id, position, color, keysPressed } = newPlayer
      this.players[id] = new Player(p5, id, position, color, keysPressed)
    })
  
    socket.on('player disconnected', (id: string) => {
      console.log('disconnected~')
      delete this.players[id]
    })
  
    socket.on('pressedKeys changed', (data: {
      id: string,
      keysPressed: KeysPressed,
      position: Position
    }) => {
      // synchronize the user's position and the keysPressed with the server data
      this.players[data.id].syncWithServer(data.keysPressed, data.position)
    })
  
    socket.on('bomb placed', (bomb: ServerBomb) => {
      const untilExplosion = 2500 - (Date.now() - bomb.plantedTime)
      this.bombs.push(new Bomb(bomb.position.x, bomb.position.y, untilExplosion))
    })
  
    // create canvas
    p5.createCanvas(...c.canvasSize)
    // set background color
    p5.background(c.backgroundColor)
    // set the framerate to 3 fps
    p5.frameRate(40)
  }
}
