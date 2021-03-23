import { NotFound } from "./notFound";
import { Recipe } from "./recipe";

// Request
export type QueryParameter = {
  // 検索キーワード。マルチバイト文字列の場合は URL Encode が必用。
  keyword: string;

  // ページネーションする場合に指定するページ番号
  page?: number;
};

// Response
export type APISuccessResponse = {
  // 検索にヒットしたレシピ一覧
  recipes: Recipe[];

  // ページネーション可能な場合の次、前のページのリンク
  links: {
    next?: string;
    prev?: string;
  };
};
export type APIResponse = APISuccessResponse | NotFound;
