import * as React from 'react'
import P5Canvas from 'react-p5-wrapper'
import * as p5 from 'p5'

export function sketch(p5: p5) {
  p5.setup = function() {
    // empty setup
  }

  p5.draw = function() {
    p5.ellipse(50, 50, 50, 50)
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
