import { GameObject, Position } from './GameObject'

export class Bomb extends GameObject {
  private _plantedTime: number;
  private _exploded: boolean;
  /**
   * 
   * @param x x position of the bomb
   * @param y y position of the bomb
   * @param untilExplostion time left until explosion in milliseconds
   */
  constructor(x: number, y: number, untilExplostion: number) {
    // set position
    const position: Position = { x, y }
    super(position)

    // set planted time
    this._plantedTime = Date.now()
    this._exploded = false
    console.log(this._plantedTime)

    // set timer

    setTimeout(() => {
      console.log('exploded: true')
      this._exploded = true
    }, untilExplostion)
  }

  public get isExploded(): boolean {
    return this._exploded
  }
}