import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import { Recipe, searchRecipes } from "../lib/client/recipe";

const TopPage: NextPage = () => {
  const router = useRouter();

  // このページで表示するレシピのリスト
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  const [nextRecipeAPIParamsString, setNextRecipeAPIParamsString] = useState<
    string | null
  >(null);

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  const [prevRecipeAPIParamsString, setPrevRecipeAPIParamsString] = useState<
    string | null
  >(null);

  // レシピが一件以上検索でヒットしたか
  const [recipeFound, setRecipeFound] = useState<boolean | null>(null);

  // 検索中か
  const [searching, setSearching] = useState<boolean>(true);

  // 検索欄に入力されたキーワード
  const [keyword, setKeyword] = useState<string | null>(
    router.query.keyword as string
  );

  // 検索結果を取得した際に発生したエラー
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!router.query.keyword) router.push("/");

      // URL 内のページ番号の箇所 ?page=XXX を抽出。存在しない場合は 1 とする
      const page = router.query.page ? Number(router.query.page) : 1;

      // レシピ取得 API を叩く
      setKeyword(router.query.keyword as string);
      setSearching(true);
      let response;
      try {
        response = await searchRecipes({
          keyword: router.query.keyword as string,
          page,
        });
        console.log(response);
        if (response.message == "Not Found") {
          setRecipeFound(false);
          setError("該当するレシピが見つかりませんでした。");
          return;
        }
        setRecipes(response.recipes);
        setRecipeFound(true);
      } catch (e) {
        setError(e.message);
        setRecipeFound(false);
        return;
      } finally {
        setSearching(false);
      }

      let nextRecipeAPIParamsString;
      let prevRecipeAPIParamsString;
      if (response.links) {
        nextRecipeAPIParamsString = response.links.next
          ? new URL(response.links.next).searchParams.toString()
          : null;
        prevRecipeAPIParamsString = response.links.prev
          ? new URL(response.links.prev).searchParams.toString()
          : null;
      }
      setNextRecipeAPIParamsString(nextRecipeAPIParamsString);
      setPrevRecipeAPIParamsString(prevRecipeAPIParamsString);
    })();
  }, [router.query]);

  if (searching)
    return (
      <div>
        <Head title={`${keyword} 検索中 ─ 料理板`} />
        <Header searchQuery={keyword} />
        <p>検索中……</p>
      </div>
    );

  return (
    <div>
      <Head
        title={`${keyword} の検索結果 ─ 料理板`}
        description="レシピ検索No.?／料理レシピ載せるなら 料理板"
        image="https://placehold.jp/1200x630.png"
      />
      <head>
        <title>料理板 ─ {keyword} の検索結果</title>
      </head>
      <Header searchQuery={keyword} />
      {recipeFound ? (
        <RecipeList
          recipes={recipes}
          nextRecipeAPIParamsString={nextRecipeAPIParamsString}
          prevRecipeAPIParamsString={prevRecipeAPIParamsString}
        />
      ) : (
        <div>
          <h1 className="text-center m-2">{error}</h1>
        </div>
      )}
    </div>
  );
};

// https://stackoverflow.com/questions/61891845/is-there-a-way-to-keep-router-query-on-page-refresh-in-nextjs
// CSR しているときにクエリパラメーターが URL に付いている状態でブラウザのリロードを行うと
// 1. router.query が空のオブジェクトになる。
// 2. 直後に router.query に URL に付いてたクエリパラメーターたちの値が代入される。
// が起こるのだが、1. の挙動は求めていないので、下記の getServerSideProps はそれを抑制させるためのコードである。
export function getServerSideProps(context) {
  return { props: {} };
}

export default TopPage;
