export type Position = {
  x: number,
  y: number
}

export class GameObject {
  private _x: number;
  private _y: number;

  constructor(position: Position) {
    this._x = position.x
    this._y = position.y
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }
}
