import P5 from 'p5'

export class Constants {
  /**
   * private variables
   */
  private _p5: P5;

  /**
   * constructor
   * @param p5Instance an instance of the p5 class
   */
  constructor(p5Instance: P5) {
    this._p5 = p5Instance
  }

  public get backgroundColor(): P5.Color {
    return this._p5.color(160, 183, 117)
  }

  public get canvasSize(): [number, number] {
    return [600, 600]
  }
}
