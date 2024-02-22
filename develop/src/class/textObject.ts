import GameObject from "./gameObject.js";
import IText from "../interface/text.js";
import { TextObjectParams } from "../util/type.js";
import { Util } from "../util/util.js";

/**
 * TextObjectクラス
 */
export default class TextObject extends GameObject implements IText {
  /**
   * property
   */
  public readonly _fontName: string;
  public readonly _fontSize: number;
  public _text: string;
  /**
   * accessor
   */
  get fontName(): string {
    return this._fontName;
  }
  get fontSize(): number {
    return this._fontSize;
  }
  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }
  /**
   * constructor
   * @param param 初期化パラメータ
   */
  constructor(params: TextObjectParams) {
    super({
      element: Util.createElement({
        name: "div",
      }),
      ...params,
    });
    this._fontName = params.fontName;
    this._fontSize = params.fontSize;
    this._text = params.text ?? "";
  }

  /**
   * 描画
   */
  draw(): void {
    this.element.style.fontFamily = this.fontName;
    this.element.style.fontSize = this.fontSize.toString() + "px";
    this.element.innerText = this.text;
    super.draw();
  }
}
