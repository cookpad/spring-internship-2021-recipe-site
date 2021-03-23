import { Recipe } from "./recipe";

// Request
export type RequestBody = {
  // レシピ名
  title: string;

  // レシピ概要
  description: string;

  // レシピ画像のURL。`POST /image_urls` で受け取った object_url を指定する。
  // レシピ画像はなくてもよいのでない場合は指定しなくてもよい。
  image_url?: string;

  // レシピの手順
  steps: string[];

  // レシピの材料
  ingredients: {
    // 材料名
    name: string;
    // 分量
    quantity: string;
  }[];
};

// Response
export type APIResponse = Recipe;
