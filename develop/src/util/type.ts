import Keyboard from "../class/keyboard.js";

/**
 * Point3D type:空間上の位置
 */
export type Point3D = {
  x: number;
  y: number;
  z: number;
};

/**
 * Point2D type:平面上の位置
 */
export type Point2D = Omit<Point3D, "z">;

/**
 * Size type　平面上のサイズ
 */
export type Size = Omit<Point3D, "z">;

/**
 * Size type　GameObject Params type:コンストラクタの引数
 */
export type GameObjectParams = {
  element: HTMLElement; //HTML要素
  position: Point2D;
  size?: Size;
};

/**
 * TextObjectParams型:コンストラクタ型引数
 */
export type TextObjectParams = {
  position: Point2D; //位置
  fontName: string; //書体
  fontSize: number; //文字サイズ
  text?: string; //テキストの内容
};

/**
 * MovableObjectParams型:コンストラクタ引数
 */
export type MovableObjectParams = {
  element: HTMLElement; //HTML要素
  position: Point2D;
  size: Size; //サイズ
  velocity: Point2D; //速度
  acceleration: Point2D; //加速度
};

/**
 * ScoreParams型:コンストラクタ引数
 */
export type ScoreParams = Omit<TextObjectParams, "text"> & {
  score: number; //スコアの値
};
/**
 * LevelParams型:コンストラクタ引数
 */
export type LevelParams = Omit<TextObjectParams, "text"> & {
  level: number; //レベルの値
};

/**
 * CometParams型: コンストラクタ引数
 */
export type CometParams = Omit<MovableObjectParams, "element">;

/**
 * MeteoParams型:コンストラクタ引数
 */
export type MeteoParams = Omit<MovableObjectParams, "element"> & {
  power: number; //強度
};
/**
 * ShotParams型:コンストラクタ引数
 */
export type ShotParams = Omit<MovableObjectParams, "element"> & {
  power: number; //強度
};

/**
 * PlayerParams型:コンストラクタ引数
 */

export type PlayerParams = Omit<
  MovableObjectParams,
  "element" | "velocity" | "acceleration"
> & {
  speed: number; //速さ
  keyboard: Keyboard;
};
