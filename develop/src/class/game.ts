import Screen from "./screen.js";
import Keyboard from "./keyboard.js";
import Score from "./score.js";
import Level from "./level.js";
import Comet from "./comet.js";
import Meteo from "./meteo.js";
import Shot from "./shot.js";
import Player from "./player.js";
import { Util } from "../util/util.js";
import { Point2D } from "../util/type.js";

/**
 * Game Class
 */
export default class Game {
  /**
   * property
   */
  private readonly _player: Player; //自機
  private _shots: Array<Shot>; //弾
  private _comets: Array<Comet>; //流星
  private _meteo: Array<Meteo>; //隕石
  /* テキスト */
  private _score: number; //スコアの値
  private _level: number; //レベルの値
  private readonly _scoreBoard: Score; //スコアボード
  private readonly _levelBoard: Level; //レベルボード
  /*タイマー */
  private readonly _mainTimer: number; //メインタイマー
  private readonly _cometTimer: number; //流星タイマー
  private _shotTimer: number; //弾タイマー
  private _meteoTimer: number; //隕石タイマー
  private _shotInterval: number; //弾の生成インターバル
  private _meteoInterval: number; //隕石の生成インターバル

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
    this._shotTimer = setInterval(
      this.createShot.bind(this),
      this._shotInterval
    );
    this._cometTimer = setInterval(this.createComet.bind(this), 5000);
    this._meteoTimer = setInterval(
      this.createMeteo.bind(this),
      this._meteoInterval
    );
  }

  /**
   * メインタイマー処理
   */
  private mainTimer(): void {
    //スコアを加算
    //境界チェック
    //衝突判定
    //ゲームの状態を保存
  }
  /**
   * scoreの加算
   */
  private addScore(): void {
    //スコアの更新
    //updateLevel()を呼び出す
  }
  /**
   * Levelを更新
   */
  private updateLevel(): void {
    //レベルを更新
  }
  /**
   * 境界チェック
   */
  private checkBoundary(): void {
    //境界チェック
  }
  /**
   * 衝突判定
   */
  private detectCollision(): void {
    //衝突判定
  }
  /**
   * 弾の生成
   */
  private createShot(): void {
    //弾のサイズ
    const size = { x: 20, y: 65 };
    //弾の加速度
    const acceleration = { x: 0, y: 2 };
    //弾のx座標
    const x_array: Array<number> = [];
    //弾の速度
    const v_array: Array<Point2D> = [];
    //同時発射数と初期位置を決める
    if (this._level < 5) {
      //Lv4以下 1way
      x_array.push(this._player.position.x);
      v_array.push({ x: 0, y: 20 });
    } else if (this._level < 10) {
      //Lv5以上 2way
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x + size.x);
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
    } else if (this._level < 20) {
      //Lv10以上 3way
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x);
      x_array.push(this._player.position.x + size.x);
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
    } else if (this._level < 50) {
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
    } else {
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
  private createMeteo(): void {
    //初期位置を決める
    //隕石の強度を求める
    //隕石を生成して配列に追加
    //隕石を生成するタイマーの間隔を更新
  }
  /**
   * 流星の生成
   */
  private createComet(): void {
    //初期位置を決める
    //流星を生成して配列に追加
  }
  /**
   * 保存
   */
  private save(): void {
    //ゲームの状態を保存する
  }
  /**
   * ロード
   */
  private load(): void {
    //ゲームの状態を復元する
  }
}
