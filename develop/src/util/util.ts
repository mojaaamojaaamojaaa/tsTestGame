import GameObject from "../class/gameObject.js";
import { Point2D } from "./type.js";
import Screen from "../class/screen.js";

/**
 * createElement メソッド引数の型
 */
type createElementOptions = {
  name: string;
  attr?: Record<string, string>;
};

/**
 * 共通関数
 */
export namespace Util {
  /**
   * HTML要素生成
   * @param name タグの名前
   * @param attr 属性
   * @returns HTMLElement オブジェクト
   */
  export const createElement = ({
    name,
    attr,
  }: createElementOptions): HTMLElement => {
    //空のHTML要素を生成
    const element = document.createElement(name);
    //属性が指定されていれば追加
    if (typeof attr !== "undefined") {
      let key: keyof typeof attr;
      for (key in attr) {
        const value = attr[key];
        element.setAttribute(key, value);
      }
    }
    //生成した要素を返す
    return element;
  };
  /**
   * オブジェクトの座標を画面内に制限
   * @param obj 検査対象のオブジェクト
   * @param strict true:厳密な制限 false:ゆるい制限
   * @returns Point2D 制限された座標
   */
  export const clampScreen = <T extends GameObject>(
    obj: T,
    strict: boolean = false
  ): Point2D => {
    let [x, y] = [obj.position.x, obj.position.y];
    //strictがtrueの場合は画面外にはみ出していれば制限する
    //falseの場合は制限しない
    let offsetX = strict ? obj.size.x / 2 : -(obj.size.x / 2);
    let offsetY = strict ? obj.size.y / 2 : -(obj.size.y / 2);
    //X座標を制限
    x = Math.max(x, offsetX);
    x = Math.min(x, Screen.width - offsetX);
    //Y座標を制限
    y = Math.max(y, offsetY);
    y = Math.min(y, Screen.height - offsetY);
    //制限された座標
    return {
      x: x,
      y: y,
    };
  };
}
