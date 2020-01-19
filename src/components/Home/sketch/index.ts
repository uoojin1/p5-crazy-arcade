import * as P5 from 'p5'

/**
 * set up function
 * @param p5 P5 class instance
 */
const setup = (p5: P5) => () => {
  // create canvas
  p5.createCanvas(600, 600)
  // set the framerate to 3 fps
  p5.frameRate(30)
}

/**
 * function that runs on every new frame
 * @param p5 
 */
const draw = (p5: P5) => () => {
  p5.clear()
  if (p5.mouseIsPressed) {
    p5.fill(0);
  } else {
    p5.fill(255);
  }
  p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
}

/**
 * The main function for p5.js
 * @param p5 
 */
export function sketch(p5: P5) {
  // set up the sketch
  p5.setup = setup(p5)
  // funciton to run on every new frame
  p5.draw = draw(p5)
}