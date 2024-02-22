import GameObject from "./gameObject.js";
import { Util } from "../util/util.js";
/**
 * TextObjectクラス
 */
export default class TextObject extends GameObject {
    /**
     * property
     */
    _fontName;
    _fontSize;
    _text;
    /**
     * accessor
     */
    get fontName() {
        return this._fontName;
    }
    get fontSize() {
        return this._fontSize;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    /**
     * constructor
     * @param param 初期化パラメータ
     */
    constructor(params) {
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
    draw() {
        this.element.style.fontFamily = this.fontName;
        this.element.style.fontSize = this.fontSize.toString() + "px";
        this.element.innerText = this.text;
        super.draw();
    }
}
