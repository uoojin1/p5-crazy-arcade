import P5 from 'p5'
import range from 'lodash/range'

let gridPoints: number[] = range(25, 500, 50)

function findClosestGridPoint(position: number) {
  let min = 9999;
  let minIndex = 0;
  gridPoints.forEach((point, index) => {
    let distance = Math.abs(point - position)
    if (min > distance) {
      min = distance
      minIndex = index
    }
  })
  return minIndex
}

export enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export type KeysPressed = {
  l: boolean,
  r: boolean,
  u: boolean,
  d: boolean
}

export type Color = {
  r: number,
  g: number,
  b: number
}

export type Position = {
  x: number,
  y: number
}

export type ServerPlayerData = {
  id: string,
  position: Position,
  color: Color,
  keysPressed: KeysPressed
}

export class Player {
  private _id: string;
  private _x: number;
  private _y: number;
  private _velocity: number;
  private _color: P5.Color;
  private _keysPressed: KeysPressed;
  public gridIndex: [number, number];

  constructor(p5: P5, id: string, position: Position, color: Color, keysPressed: KeysPressed) {
    this._id = id
    this._x = position.x
    this._y = position.y
    this._velocity = 8
    this._color = p5.color(
      color.r,
      color.g,
      color.g
    )
    this._keysPressed = keysPressed
    this.gridIndex = [
      findClosestGridPoint(position.x),
      findClosestGridPoint(position.y)
    ]
  }

  public get color(): P5.Color { return this._color }

  public get id(): string { return this._id }

  public get x(): number { return this._x }

  public get y(): number { return this._y }

  public get position() {
    return {
      x: this._x,
      y: this._y
    }
  }

  public get keysPressed(): KeysPressed { return this._keysPressed }

  public set x(value: number) {
    this._x = value
  }

  public set y(value: number) {
    this._y = value
  }

  public move(direction: DIRECTION) {
    if (direction === DIRECTION.UP) {
      if (this._y > this._velocity + 1) {
        this._y -= this._velocity
      }
    }
    if (direction === DIRECTION.DOWN) {
      if (this._y < 500 - (this._velocity + 1)) {
        this._y += this._velocity
      }
    }
    if (direction === DIRECTION.LEFT) {
      if (this._x > this._velocity + 1) {
        this._x -= this._velocity
      }
    }
    if (direction === DIRECTION.RIGHT) {
      if (this._x < 500 - (this._velocity + 1)) {
        this._x += this._velocity
      }
    }
    this.checkGridIndexChange()
  }

  private checkGridIndexChange() {
    // x
    if (this._x < gridPoints[this.gridIndex[0]] - 25) {
      this.gridIndex[0] = this.gridIndex[0] - 1
    }
    if (this._x > gridPoints[this.gridIndex[0]] + 25) {
      this.gridIndex[0] = this.gridIndex[0] + 1
    }
    // y
    if (this._y < gridPoints[this.gridIndex[1]] - 25) {
      this.gridIndex[1] = this.gridIndex[1] - 1
    }
    if (this._y > gridPoints[this.gridIndex[1]] + 25) {
      this.gridIndex[1] = this.gridIndex[1] + 1
    }
  }

  public syncWithServer(keysPressed: KeysPressed, position: Position) {
    this._keysPressed = keysPressed
    this._x = position.x
    this._y = position.y
  }

  public updateKeysPressed(key: string, value: boolean): void {
    if ((key in this.keysPressed) === false) {
      throw new Error('the given key is not one of [u, d, l, r]')
    }
    this._keysPressed[key] = value
  }
}