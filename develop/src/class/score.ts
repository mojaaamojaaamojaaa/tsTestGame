import TextObject from "./textObject.js";
import { ScoreParams } from "../util/type.js";
/**
 * Score Class
 */
export default class Score extends TextObject {
  /**
   * property
   */
  protected _score: number;
  /**
   * accessor
   */
  set score(score: number) {
    this._score = score;
  }
  /**
   * constructor
   * @param params 初期化パラメータ
   */
  constructor(params: ScoreParams) {
    super(params);
    this._score = params.score;
  }
  /**
   * 描画
   */
  draw(): void {
    //テキストを整形
    this._text = this._score.toString().padStart(10, "0");
    super.draw();
  }
}
