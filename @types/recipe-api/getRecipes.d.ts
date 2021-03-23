import { Recipe } from "./recipe"

// Request
export type QueryParameter = {
  // ページネーションする場合に指定するページ番号。
  page?: number;

  // レシピIDをカンマで区切って複数指定でる。指定できるIDの数の上限は10。
  // idを指定した場合はページネーションはできないのでidとpageは同時に指定できない。
  id?: string;
};

// Response
export type APIResponse = {
  // レシピ一覧
  recipes: Recipe[];

  // ページネーション可能な場合の次、前のページのリンク
  links: {
    next?: string;
    prev?: string;
  };
};
