import * as React from 'react'
import P5Canvas from 'react-p5-wrapper'
import * as P5 from 'p5'

export function sketch(p5: P5) {
  p5.setup = () => {
    // create canvas
    p5.createCanvas(600, 600)
  }

  p5.draw = () => {
    if (p5.mouseIsPressed) {
      p5.fill(0);
    } else {
      p5.fill(255);
    }
    p5.ellipse(p5.mouseX, p5.mouseY, 80, 80);
  }
}

export const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <P5Canvas sketch={sketch} />
    </div>
  )
}
