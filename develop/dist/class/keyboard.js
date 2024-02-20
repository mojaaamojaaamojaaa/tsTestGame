/**
 * Keyboard Class
 */
export default class Keyboard {
    /**
     * property
     */
    _key;
    /**
     * accessor
     */
    get up() {
        return this._key["ArrowUp"] === true || this._key["8"] === true;
    }
    get down() {
        return this._key["ArrowDown"] === true || this._key["2"] === true;
    }
    get left() {
        return this._key["ArrowLeft"] === true || this._key["4"] === true;
    }
    get right() {
        return this._key["ArrowRight"] === true || this._key["6"] === true;
    }
    /**
     * constructor
     */
    constructor() {
        this._key = {};
        this.watchEvent();
    }
    /**
     * イベント監視
     */
    watchEvent() {
        //keydown
        document.addEventListener("keydown", (e) => {
            this._key[e.key] = true;
            console.log(this._key); //test
        });
        //keyup
        document.addEventListener("keyup", (e) => {
            this._key[e.key] = false;
            console.log(this._key); //test
        });
    }
}
