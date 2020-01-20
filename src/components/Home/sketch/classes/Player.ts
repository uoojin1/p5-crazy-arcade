import P5 from 'p5'

export enum DIRECTION {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export class Player {
  private _id: string;
  private _x: number;
  private _y: number;
  private _velocity: number;
  private _color: P5.Color;

  constructor(p5: P5, id: string, x: number, y: number, color: number[]) {
    // assign the player to a random position between x: 50~550 and y: 50~550
    this._id = id
    this._x = x
    this._y = y
    this._velocity = 5
    // assign a random color to the player
    this._color = p5.color(
      color[0], // R
      color[1], // G
      color[2]  // B
    )
  }

  public get color(): P5.Color { return this._color }

  public get id(): string { return this._id }

  public get x(): number { return this._x }

  public get y(): number { return this._y }

  public set x(value: number) {
    this._x = value
  }

  public set y(value: number) {
    this._y = value
  }

  public move(direction: DIRECTION, callback: Function) {
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
    callback()
  }
}