import TextObject from "./textObject.js";
/**
 * Score Class
 */
export default class Score extends TextObject {
    /**
     * property
     */
    _score;
    /**
     * accessor
     */
    set score(score) {
        this._score = score;
    }
    /**
     * constructor
     * @param params 初期化パラメータ
     */
    constructor(params) {
        super(params);
        this._score = params.score;
    }
    /**
     * 描画
     */
    draw() {
        //テキストを整形
        this._text = this._score.toString().padStart(10, "0");
        super.draw();
    }
}
