import P5 from 'p5'

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

  constructor(p5: P5, id: string, position: Position, color: Color, keysPressed: KeysPressed) {
    this._id = id
    this._x = position.x
    this._y = position.y
    this._velocity = 5
    this._color = p5.color(
      color.r,
      color.g,
      color.g
    )
    this._keysPressed = keysPressed
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
      this._y -= this._velocity
    }
    if (direction === DIRECTION.DOWN) {
      this._y += this._velocity
    }
    if (direction === DIRECTION.LEFT) {
      this._x -= this._velocity
    }
    if (direction === DIRECTION.RIGHT) {
      this._x += this._velocity
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