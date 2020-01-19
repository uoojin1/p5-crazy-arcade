import * as P5 from 'p5'
import { Constants } from './constants'
import { Bomb } from './classes/Bomb'
// import { keyPressed } from './keyboardEvent'

// constants
let c: Constants

let x: number = 50;
let y: number = 50;

let bombs: Bomb[] = []

// set up function
const setup = (p5: P5) => () => {
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
    bombs.push(new Bomb(x, y, 2500))
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

const drawPlayer = (p5: P5): void => {
  p5.noStroke()
  p5.fill(p5.color(255, 255, 255))
  p5.circle(x, y, 30)
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
    x -= 10;
  }

  if (p5.keyIsDown(p5.RIGHT_ARROW)) {
    x += 10;
  }

  if (p5.keyIsDown(p5.UP_ARROW)) {
    y -= 10;
  }

  if (p5.keyIsDown(p5.DOWN_ARROW)) {
    y += 10;
  }

  // p5.ellipse(x, y, 40, 40);
  drawBomb(p5)
  checkExplosion(p5)
  drawPlayer(p5)
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