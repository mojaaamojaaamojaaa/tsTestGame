import GameObject from "./class/gameObject.js";
//img要素を生成し、src属性に画像のパス設定
const element = document.createElement("img");
element.setAttribute("src", "./assets/images/player.png");
//コンストラクタに渡すパラメータを用意
const params = {
    element: element,
    position: { x: 200, y: 200 },
    size: { x: 100, y: 90 },
};
//GameObjectのインスタンスを生成
const obj = new GameObject(params);
