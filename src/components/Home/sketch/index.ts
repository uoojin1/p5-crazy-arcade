import io from 'socket.io-client'
import P5 from 'p5'
import { Constants } from './constants'
import { Player, DIRECTION } from './classes/Player'
import { Bomb } from './classes/Bomb'

// constants
let c: Constants

let x: number = 50;
let y: number = 50;

let bombs: Bomb[] = []

let myCharacter: Player;

let players = {};

type NewPlayer = {
  x: number,
  y: number,
  id: string,
  color: [number, number, number]
}

type ServerData = {
  allPlayers: Object
  yourCharacter: NewPlayer
}

// set up function
const setup = (p5: P5) => () => {
  // open socket connection
  const HOST: string = location.origin.replace(/^http/, 'ws')
  const socket: SocketIOClient.Socket = io(HOST)
  
  socket.on('player created', ({ allPlayers, yourCharacter }: ServerData) => {
    Object.keys(allPlayers).forEach((key) => {
      const { id, x, y, color } = allPlayers[key]
      players[id] = new Player(p5, id, x, y, color)
    })
    const { id, x, y, color } = yourCharacter
    myCharacter = new Player(p5, id, x, y, color)
    players[id] = myCharacter
  })

  socket.on('new player joined', (newPlayer: NewPlayer) => {
    const { id, x, y, color } = newPlayer
    players[id] = new Player(p5, id, x, y, color)
  })

  socket.on('player disconnected', (id: string) => {
    console.log('disconnected~')
    delete players[id]
  })

  // create canvas
  p5.createCanvas(...c.canvasSize)
  // set background color
  p5.background(c.backgroundColor)
  // set the framerate to 3 fps
  p5.frameRate(40)
}

const keyPressed = (p5: P5) => () => {
  // pressed spacebar
  if (p5.keyCode === 32) {
    console.log(`BOMB @ x: ${x}, y: ${y}`)
    bombs.push(new Bomb(myCharacter.x, myCharacter.y, 2500))
    console.log('bombs', bombs)
  }
}

const resetCanvas = (p5: P5): void => {
  p5.clear()
  p5.background(c.backgroundColor)
}

const drawBomb = (p5: P5): void => {
  p5.fill(p5.color(255, 204, 0))
  bombs.forEach(bomb => p5.circle(bomb.x, bomb.y, 20))
}

const drawPlayers = (p5: P5): void => {
  Object.values(players).forEach((p: Player) => {
    p5.noStroke()
    p5.fill(p.color)
    p5.circle(p.x, p.y, 30)
  })
}

const checkExplosion = (p5: P5): void => {
  for (let i = 0; i < bombs.length; i++) {
    const bomb = bombs[i]
    if (bomb.isExploded === true) {
      console.log('explosion!!!!', bomb)
      p5.fill(p5.color(255, 204, 0))
      p5.noStroke()
      p5.ellipse(bomb.x, bomb.y, 80, 20)
      p5.ellipse(bomb.x, bomb.y, 20, 80)
      bombs.shift()
      console.log('bombs left..', bombs)
    } else {
      break
    }
  }
}

// function that runs on every new frame
const draw = (p5: P5) => () => {
  // reset canvas
  resetCanvas(p5)

  // movement
  if (p5.keyIsDown(p5.LEFT_ARROW)) {
    myCharacter.move(DIRECTION.LEFT)
  }
  if (p5.keyIsDown(p5.RIGHT_ARROW)) {
    myCharacter.move(DIRECTION.RIGHT)
  }
  if (p5.keyIsDown(p5.UP_ARROW)) {
    myCharacter.move(DIRECTION.UP)
  }
  if (p5.keyIsDown(p5.DOWN_ARROW)) {
    myCharacter.move(DIRECTION.DOWN)
  }

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
  // funciton to run on every new frame
  p5.draw = draw(p5)
}