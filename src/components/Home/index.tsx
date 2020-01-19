import * as React from 'react'
import P5Canvas from 'react-p5-wrapper'
import { sketch } from './sketch'

export const Home = () => {
  return (
    <div>
      <h1>HOME</h1>
      <P5Canvas sketch={sketch} />
    </div>
  )
}
