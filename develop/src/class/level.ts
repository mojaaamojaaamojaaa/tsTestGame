import TextObject from "./textObject.js";
import { LevelParams } from "../util/type.js";

/**
 * Level Class
 */
export default class Level extends TextObject {
  /**
   * property
   */
  protected _level: number;
  /**
   * accessor
   */
  set level(level: number) {
    this._level = level;
  }
  /**
   * constructor
   * @param params 初期化パラメータ
   */
  constructor(params: LevelParams) {
    super(params);
    this._level = params.level;
  }
  /**
   * 描画
   */
  draw(): void {
    this._text = "LEVEL:" + this._level.toString();
    super.draw();
  }
}
