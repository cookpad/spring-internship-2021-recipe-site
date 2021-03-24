export type QueryParameter = {
    // ページネーションする場合に指定するページ番号。
    page?: number;
  
    // レシピIDをカンマで区切って複数指定でる。指定できるIDの数の上限は10。
    // idを指定した場合はページネーションはできないのでidとpageは同時に指定できない。
    id?: string;
};


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

export type Response = {
    // レシピ一覧
    recipes: Recipe[];
  
    // ページネーション可能な場合の次、前のページのリンク
    links: PagingLinks;
};

export type PagingLinks = {
    next?: string;
    prev?: string;
}