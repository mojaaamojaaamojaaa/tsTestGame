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
