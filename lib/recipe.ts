// [こちら](https://gist.github.com/hokaccha/0db2c6c26ec0f7dfc680cf5010e61180#api%E4%BB%95%E6%A7%98%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E5%9E%8B)を流用

import api from "./api-client";
import { API_ENDPOINT_RECIPES } from "./constants";

export type Recipe = {
  // レシピID
  id: number;

  // レシピ名
  title: string;

  // レシピ概要
  description: string;

  // レシピ画像。画像がない場合は null。
  image_url: string | null;

  // レシピ作者
  author: {
    user_name: string;
  };

  // レシピを公開した日時。ISO 8601
  published_at: string;

  // レシピの手順
  steps: string[];

  // レシピの材料
  ingredients: {
    // 材料名
    name: string;
    // 分量（100g など）
    quantity: string;
  }[];

  // 関連するレシピのIDが最大5つ入っている。Poster View などを実装するのに使う。
  // なお、関連レシピの算出アルゴリズムのできが悪いため関連性が低い可能性がある点に注意。
  related_recipes: number[];
};

type QueryParameter = {
  // ページネーションする場合に指定するページ番号。
  page?: number;

  // レシピIDをカンマで区切って複数指定できる。指定できるIDの数の上限は10。
  // idを指定した場合はページネーションはできないのでidとpageは同時に指定できない。
  id?: string;
};

type Response = {
  // レシピ一覧
  recipes: Recipe[];

  // ページネーション可能な場合の次、前のページのリンク
  links: {
    next?: string;
    prev?: string;
  };
};

export async function getRecipes(param?: QueryParameter): Promise<Response> {
  // 開発中に API サーバーを不必要に叩きすぎないようにする
  if (process.env.NODE_ENV === "development")
    return require("../data/recipes.json") as Response;

  let headers: Headers;

  if (param) {
    headers["id"] = param.id?.toString();
    headers["page"] = param.page;
  }

  const req = await api(API_ENDPOINT_RECIPES);
  return (await req.json()) as Response;
}

export async function getRecipe(id: number): Promise<Recipe | null> {
  const req = await api(`${API_ENDPOINT_RECIPES}/${id}`);
  return (await req.json()) as Recipe;
}
