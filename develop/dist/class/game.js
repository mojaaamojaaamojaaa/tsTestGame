import Screen from "./screen.js";
import Keyboard from "./keyboard.js";
import Score from "./score.js";
import Level from "./level.js";
import Comet from "./comet.js";
import Meteo from "./meteo.js";
import Shot from "./shot.js";
import Player from "./player.js";
import { Util } from "../util/util.js";
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
    _meteos; //隕石
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
        this._meteos = []; //隕石
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
        this.addScore(1);
        //境界チェック
        this.checkBoundary();
        //衝突判定
        this.detectCollision();
        //ゲームの状態を保存
        this.save();
    }
    /**
     * scoreの加算
     * @param score 加算
     */
    addScore(score) {
        //スコアの更新
        this._score += score;
        this._scoreBoard.score = this._score;
        //updateLevel()を呼び出す
        this.updateLevel();
    }
    /**
     * Levelを更新
     */
    updateLevel() {
        //次のレベルに必要なスコア
        const nextScore = Util.getNextScore(this._level);
        //必要スコアへの到達範囲
        if (nextScore <= this._score) {
            //レベルを更新
            this._level++;
            //レベル描画更新
            this._levelBoard.level = this._level;
        }
    }
    /**
     * 境界チェック
     */
    checkBoundary() {
        //境界チェック
        //全ての球を繰り返す
        this._shots.forEach((shot) => {
            //画面外に出たかどうか(条件分岐)
            if (Util.isOutsideScreen(shot)) {
                //弾を消去
                Util.removeObject(shot, this._shots);
            }
        });
        //全ての流星を繰り返す
        this._comets.forEach((comet) => {
            //画面外に出たかどうか(条件分岐)
            if (Util.isOutsideScreen(comet)) {
                //流星を消去
                Util.removeObject(comet, this._comets);
            }
        });
        //全ての隕石を繰り返す
        this._meteos.forEach((meteo) => {
            //画面外に出たかどうか(条件分岐)
            if (Util.isOutsideScreen(meteo)) {
                //隕石を消去
                Util.removeObject(meteo, this._meteos);
            }
        });
        console.log("shot" + this._shots.length);
        console.log("comet" + this._comets.length);
        console.log("meteo" + this._meteos.length);
    }
    /**
     * 衝突判定
     */
    detectCollision() {
        //衝突判定
        //全ての流星を繰り返す
        this._comets.forEach((comet) => {
            if (Util.isCollding(this._player, comet, 30)) {
                //流星を削除
                Util.removeObject(comet, this._comets);
                //次のレベルまでに必要なスコアを加算
                const nextScore = Util.getNextScore(this._level);
                this.addScore(nextScore - this._score);
            }
        });
        //全ての弾を繰り返す
        this._shots.forEach((shot) => {
            //全ての隕石を調査する
            for (const meteo of this._meteos) {
                //隕石と弾の衝突判定
                if (Util.isCollding(meteo, shot, 80)) {
                    //命中したらスコアを加算
                    this.addScore(100);
                    //隕石の強度を減らし、破壊したら消去
                    if ((meteo.power -= shot.power) <= 0) {
                        Util.removeObject(meteo, this._meteos);
                    }
                    //弾を消去
                    Util.removeObject(shot, this._shots);
                    //調査終了
                    break;
                }
            }
        });
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
        const power = Util.getShotPower(this._level);
        //弾を生成し配列に追加
        x_array.forEach((x, i) => {
            const position = { x: x, y: y };
            const velocity = v_array[i];
            this._shots.push(new Shot({
                position: position,
                size: size,
                velocity: velocity,
                acceleration: acceleration,
                power: power,
            }));
        });
        //弾を生成するタイマーの間隔を更新
        clearInterval(this._shotTimer);
        this._shotInterval = Math.max(100, 1000 - this._level);
        this._shotTimer = setInterval(this.createShot.bind(this), this._shotInterval);
    }
    /**
     * 隕石の生成
     */
    createMeteo() {
        //初期位置を決める
        //隕石のサイズ
        const size = { x: 150, y: 150 };
        //隕石の座標
        const position = {
            x: Util.random(0, Screen.width),
            y: Screen.height + 75,
        };
        //隕石の速度
        const velocity = {
            x: Util.random(-2, -1),
            y: Util.random(-1, 1),
        };
        //隕石の加速度
        const acceleration = {
            x: 0,
            y: Util.random(-1, 0),
        };
        //隕石の強度を求める
        const power = Util.getMeteoPower(this._level);
        //隕石を生成して配列に追加
        this._meteos.push(new Meteo({
            position: position,
            size: size,
            velocity: velocity,
            acceleration: acceleration,
            power: power,
        }));
        //隕石を生成するタイマーの間隔を更新
        clearInterval(this._meteoTimer);
        this._meteoInterval = Math.max(500, 2000 - this._level * 100);
        this._meteoTimer = setInterval(this.createMeteo.bind(this), this._meteoInterval);
    }
    /**
     * 流星の生成
     */
    createComet() {
        //初期位置を決める
        //流星のサイズ
        const size = { x: 50, y: 50 };
        //流星の座標
        const position = { x: 0, y: 0 };
        //流星の速度
        const velocity = { x: 0, y: 0 };
        //流星の加速度
        const acceleration = { x: 0, y: 0 };
        //50%の確率で出現位置と移動方向を分岐
        if (Util.random(0, 100) < 50) {
            [position.x, position.y] = [
                Screen.width + 25,
                Screen.height - Util.random(0, 500),
            ];
            [velocity.x, velocity.y] = [-6, -3];
            [acceleration.x, acceleration.y] = [-0.6, -0.3];
        }
        else {
            [position.x, position.y] = [-25, Screen.height - Util.random(0, 500)];
            [velocity.x, velocity.y] = [6, -3];
            [acceleration.x, acceleration.y] = [0.6, -0.3];
        }
        //流星を生成して配列に追加
        this._comets.push(new Comet({
            position: position,
            size: size,
            velocity: velocity,
            acceleration: acceleration,
        }));
    }
    /**
     * 保存
     */
    save() {
        //ゲームの状態を保存する
        const data = {
            level: this._level,
            score: this._score,
            shotInterval: this._shotInterval,
            meteoInterval: this._meteoInterval,
        };
        //JSONに変換してストレージに保存
        localStorage.setItem("data", JSON.stringify(data));
    }
    /**
     * ロード
     */
    load() {
        //ゲームの状態を復元する
        const json = localStorage.getItem("data");
        //データの存在をチェック
        if (json !== null) {
            //JSONをオブジェクトに変換
            const data = JSON.parse(json);
            //保存データを復元
            this._level = data.level;
            this._score = data.score;
            this._shotInterval = data.shotInterval;
            this._meteoInterval = data.meteoInterval;
            //表示に反映
            this._scoreBoard.score = this._score;
            this._levelBoard.level = this._level;
        }
    }
}
