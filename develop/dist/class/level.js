import TextObject from "./textObject.js";
/**
 * Level Class
 */
export default class Level extends TextObject {
    /**
     * property
     */
    _level;
    /**
     * accessor
     */
    set level(level) {
        this._level = level;
    }
    /**
     * constructor
     * @param params 初期化パラメータ
     */
    constructor(params) {
        super(params);
        this._level = params.level;
    }
    /**
     * 描画
     */
    draw() {
        this._text = "LEVEL:" + this._level.toString();
        super.draw();
    }
}
