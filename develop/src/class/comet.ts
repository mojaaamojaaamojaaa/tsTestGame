import MovableObject from "./movableObject.js";
import { CometParams } from "../util/type.js";
import { Util } from "../util/util.js";

/**
 * Comet Class
 */
export default class Comet extends MovableObject {
  /**
   * constructor
   * @param params 初期化パラメータ
   */
  constructor(params: CometParams) {
    super({
      element: Util.createElement({
        name: "img",
        attr: { src: "./assets/images/comet.png", class: "blink" },
      }),
      ...params,
    });
  }
}
