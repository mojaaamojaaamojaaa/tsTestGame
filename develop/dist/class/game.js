import Screen from "./screen.js";
import Keyboard from "./keyboard.js";
import Score from "./score.js";
import Level from "./level.js";
import Player from "./player.js";
/**
 * Game Class
 */
export default class Game {
    /**
     * property
     */
    _player; //自機
    _shots; //弾
    _comets; //流星
    _meteo; //隕石
    /* テキスト */
    _score; //スコアの値
    _level; //レベルの値
    _scoreBoard; //スコアボード
    _levelBoard; //レベルボード
    /*タイマー */
    _mainTimer; //メインタイマー
    _cometTimer; //流星タイマー
    _shotTimer; //弾タイマー
    _meteoTimer; //隕石タイマー
    _shotInterval; //弾の生成インターバル
    _meteoInterval; //隕石の生成インターバル
    /**
     * constructor
     */
    constructor() {
        //オブジェクトを初期化
        //自機を生成
        this._player = new Player({
            position: { x: Screen.width / 2, y: 45 },
            size: { x: 100, y: 90 },
            speed: 20,
            keyboard: new Keyboard(),
        });
        //配列の初期化
        this._shots = []; //弾
        this._comets = []; //流星
        this._meteo = []; //隕石
        //スコアの表示を初期化
        this._score = 0;
        this._scoreBoard = new Score({
            position: { x: 25, y: Screen.height - 25 },
            fontName: "Bungee Inline",
            fontSize: 40,
            score: this._score,
        });
        //レベルの表示を初期化
        this._level = 1;
        this._levelBoard = new Level({
            position: { x: 25, y: Screen.height - 75 },
            fontName: "Bungee Inline",
            fontSize: 24,
            level: this._level,
        });
        //ゲームの状態を復元
        this.load();
        //各種タイマーを起動
        //タイマーの実行間隔
        this._shotInterval = 1000;
        this._meteoInterval = 2000;
        //各種タイマーを開始
        this._mainTimer = setInterval(this.mainTimer.bind(this), 50);
        this._shotTimer = setInterval(this.createShot.bind(this), this._shotInterval);
        this._cometTimer = setInterval(this.createComet.bind(this), 5000);
        this._meteoTimer = setInterval(this.createMeteo.bind(this), this._meteoInterval);
    }
    /**
     * メインタイマー処理
     */
    mainTimer() {
        //スコアを加算
        //境界チェック
        //衝突判定
        //ゲームの状態を保存
    }
    /**
     * scoreの加算
     */
    addScore() {
        //スコアの更新
        //updateLevel()を呼び出す
    }
    /**
     * Levelを更新
     */
    updateLevel() {
        //レベルを更新
    }
    /**
     * 境界チェック
     */
    checkBoundary() {
        //境界チェック
    }
    /**
     * 衝突判定
     */
    detectCollision() {
        //衝突判定
    }
    /**
     * 弾の生成
     */
    createShot() {
        //弾のサイズ
        const size = { x: 20, y: 65 };
        //弾の加速度
        const acceleration = { x: 0, y: 2 };
        //弾のx座標
        const x_array = [];
        //弾の速度
        const v_array = [];
        //同時発射数と初期位置を決める
        if (this._level < 5) {
            //Lv4以下 1way
            x_array.push(this._player.position.x);
            v_array.push({ x: 0, y: 20 });
        }
        else if (this._level < 10) {
            //Lv5以上 2way
            x_array.push(this._player.position.x - size.x);
            x_array.push(this._player.position.x + size.x);
            v_array.push({ x: 0, y: 20 });
            v_array.push({ x: 0, y: 20 });
        }
        else if (this._level < 20) {
            //Lv10以上 3way
            x_array.push(this._player.position.x - size.x);
            x_array.push(this._player.position.x);
            x_array.push(this._player.position.x + size.x);
            v_array.push({ x: 0, y: 20 });
            v_array.push({ x: 0, y: 20 });
            v_array.push({ x: 0, y: 20 });
        }
        else if (this._level < 50) {
            //Lv20以上 5way
            x_array.push(this._player.position.x - size.x * 2);
            x_array.push(this._player.position.x - size.x);
            x_array.push(this._player.position.x);
            x_array.push(this._player.position.x + size.x);
            x_array.push(this._player.position.x + size.x * 2);
            v_array.push({ x: -4, y: 20 });
            v_array.push({ x: -2, y: 20 });
            v_array.push({ x: 0, y: 20 });
            v_array.push({ x: 2, y: 20 });
            v_array.push({ x: 4, y: 20 });
        }
        else {
            //Lv50以上 7way
            x_array.push(this._player.position.x - size.x * 3);
            x_array.push(this._player.position.x - size.x * 2);
            x_array.push(this._player.position.x - size.x);
            x_array.push(this._player.position.x);
            x_array.push(this._player.position.x + size.x);
            x_array.push(this._player.position.x + size.x * 2);
            x_array.push(this._player.position.x + size.x * 3);
            v_array.push({ x: -6, y: 20 });
            v_array.push({ x: -4, y: 20 });
            v_array.push({ x: -2, y: 20 });
            v_array.push({ x: 0, y: 20 });
            v_array.push({ x: 2, y: 20 });
            v_array.push({ x: 4, y: 20 });
            v_array.push({ x: 6, y: 20 });
        }
        //弾のy座標
        const y = this._player.position.y + this._player.size.y / 2;
        //弾の強度を求める
        //弾を生成し配列に追加
        //弾を生成するタイマーの間隔を更新
    }
    /**
     * 隕石の生成
     */
    createMeteo() {
        //初期位置を決める
        //隕石の強度を求める
        //隕石を生成して配列に追加
        //隕石を生成するタイマーの間隔を更新
    }
    /**
     * 流星の生成
     */
    createComet() {
        //初期位置を決める
        //流星を生成して配列に追加
    }
    /**
     * 保存
     */
    save() {
        //ゲームの状態を保存する
    }
    /**
     * ロード
     */
    load() {
        //ゲームの状態を復元する
    }
}
