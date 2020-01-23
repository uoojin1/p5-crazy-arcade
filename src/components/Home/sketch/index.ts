import io from 'socket.io-client'
import range from 'lodash/range'
import P5 from 'p5'
import { Constants } from '../../../constants'
import {
  Player, ServerPlayerData, KeysPressed, Position, DIRECTION } from '../../../classes/Player'
import { Bomb } from '../../../classes/Bomb'

// constants
let c: Constants

let bombs: Bomb[] = []

let myCharacter: Player;

let socket: SocketIOClient.Socket

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

type Players = {[key: string]: Player}

let players: Players = {};


type Row = (string|null)[]

type GameBoard = Row[]

let gameBoard: GameBoard = []

let gridPoints: number[] = range(25, 500, 50)

for (let i = 0; i < 10; i++) {
  let row: Row = []
  for (let j = 0; j < 10; j++) {
    row.push(null)
  }
  gameBoard.push(row)
  // set up grid points

}

console.log({ gameBoard })

// set up function
const setup = (p5: P5) => () => {
  // open socket connection
  const HOST: string = location.origin.replace(/^http/, 'ws')
  socket = io(HOST)
  
  socket.on('initialized game for the new user', ({ allPlayers, yourCharacter, bombsData }: InitialGameData) => {
    // create all players
    Object.keys(allPlayers).forEach((key) => {
      const { id, position, color, keysPressed } = allPlayers[key]
      players[id] = new Player(p5, id, position, color, keysPressed)
    })
    // create your character
    const { id, position, color, keysPressed } = yourCharacter
    myCharacter = new Player(p5, id, position, color, keysPressed)
    players[id] = myCharacter
    // create existing bombs
    // bombsData.forEach((bomb) => {
    //   const { position, plantedTime } = bomb
    //   const untilExplosion = 2500 - (Date.now() - plantedTime)
    //   bombs.push(new Bomb(position.x, position.y, untilExplosion))
    // })
  })

  socket.on('new player has joined', (newPlayer: ServerPlayerData) => {
    console.log('new player has joined', newPlayer.id)
    const { id, position, color, keysPressed } = newPlayer
    players[id] = new Player(p5, id, position, color, keysPressed)
  })

  socket.on('player disconnected', (id: string) => {
    console.log('disconnected~')
    delete players[id]
  })

  socket.on('pressedKeys changed', (data: {
    id: string,
    keysPressed: KeysPressed,
    position: Position
  }) => {
    // synchronize the user's position and the keysPressed with the server data
    players[data.id].syncWithServer(data.keysPressed, data.position)
  })

  // socket.on('bomb placed', (bomb: ServerBomb) => {
  //   const untilExplosion = 2500 - (Date.now() - bomb.plantedTime)
  //   bombs.push(new Bomb(bomb.position.x, bomb.position.y, untilExplosion))
  // })

  // create canvas
  p5.createCanvas(...c.canvasSize)
  // set background color
  p5.background(c.backgroundColor)
  // set the framerate to 3 fps
  p5.frameRate(45)
}

const reportKeysPressedChange = () => {
  socket.emit('report: keysPressed changed', {
    keysPressed: myCharacter.keysPressed,
    position: myCharacter.position
  })
}

const keyPressed = (p5: P5) => () => {
  const keyCode = p5.keyCode
  if ([38, 40, 37, 39, 32].includes(keyCode)) {
    if (p5.keyCode === 38) {
      myCharacter.updateKeysPressed('u', true)
    }
    if (p5.keyCode === 40) {
      myCharacter.updateKeysPressed('d', true)
    }
    if (p5.keyCode === 37) {
      myCharacter.updateKeysPressed('l', true)
    }
    if (p5.keyCode === 39) {
      myCharacter.updateKeysPressed('r', true)
    }
    if (p5.keyCode === 32) {
      // bomb
      // console.log('bomb placing')
      // @ts-ignore
      const currentTime = Date.now()

      const explodingTime = Number(Math.ceil(currentTime/1000.0) * 1000.0)
      console.log({ explodingTime: explodingTime % 10000 })
      // place the bomb on the canvas
      let bombX = gridPoints[myCharacter.gridIndex[0]]
      let bombY = gridPoints[myCharacter.gridIndex[1]]
      bombs.push(new Bomb(bombX, bombY, 3000 - (currentTime - explodingTime)))
      // send server this information to the server
      // socket.emit('report: bomb placed', {
      //   position: myCharacter.position,
      //   plantedTime: currentTime
      // })
    }
    reportKeysPressedChange()
  }
}

const keyReleased = (p5: P5) => () => {
  const keyCode = p5.keyCode
  if ([38, 40, 37, 39].includes(keyCode)) {
    if (p5.keyCode === 38) {
      myCharacter.updateKeysPressed('u', false)
    }
    if (p5.keyCode === 40) {
      myCharacter.updateKeysPressed('d', false)
    }
    if (p5.keyCode === 37) {
      myCharacter.updateKeysPressed('l', false)
    }
    if (p5.keyCode === 39) {
      myCharacter.updateKeysPressed('r', false)
    }
    reportKeysPressedChange()
  }
} 

const resetCanvas = (p5: P5): void => {
  p5.clear()
  p5.background(c.backgroundColor)
}

const drawBomb = (p5: P5): void => {
  p5.fill(p5.color(255, 204, 0))
  bombs.forEach(bomb => p5.circle(bomb.x, bomb.y, 50))
}

const drawPlayers = (p5: P5): void => {
  Object.values(players).forEach((p: Player) => {
    p5.noStroke()
    p5.fill(p.color)
    p5.circle(p.x, p.y, 50)
  })
}

const checkExplosion = (p5: P5): void => {
  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i]
    if (bomb.isExploded === true) {
      // console.log('explosion!!!!', bomb)
      p5.fill(p5.color(255, 204, 0))
      p5.noStroke()
      p5.ellipse(bomb.x, bomb.y, 200, 50)
      p5.ellipse(bomb.x, bomb.y, 50, 200)
      bombs.shift()
      // console.log('bombs left..', bombs)
    } else {
      break
    }
  }
}

// function that runs on every new frame
const draw = (p5: P5) => () => {
  // reset canvas
  resetCanvas(p5)

  // check for any movement
  Object.values(players).forEach((player: Player) => {
    if (player.keysPressed.u) {
      player.move(DIRECTION.UP)
    }
    if (player.keysPressed.d) {
      player.move(DIRECTION.DOWN)
    }
    if (player.keysPressed.l) {
      player.move(DIRECTION.LEFT)
    }
    if (player.keysPressed.r) {
      player.move(DIRECTION.RIGHT)
    }
  })

  drawBomb(p5)
  checkExplosion(p5)
  drawPlayers(p5)
}

// The main function that gets run by the P5Canvas
export function sketch(p5: P5) {
  // initialize constants
  c = new Constants(p5)
  // set up the sketch
  p5.setup = setup(p5)
  // on key press
  p5.keyPressed = keyPressed(p5)
  // on key release
  p5.keyReleased = keyReleased(p5)
  // funciton to run on every new frame
  p5.draw = draw(p5)
}