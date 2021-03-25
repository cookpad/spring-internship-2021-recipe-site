import { NextPage } from "next";
import Head from "../components/head";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import { Recipe } from "../lib/recipe";
import {
  countBookmark,
  fetchBookmark,
  initializeBookmark,
  prevOrNextPageExists,
} from "../lib/client/bookmark";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  SortingOrder,
  sortingOrderToString,
  sortingOrders,
} from "../lib/client/bookmark";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

type BookmarkLoadingState = "Loading" | "Error" | "Loaded";

// 反復処理可能なunion型
// https://www.kabuku.co.jp/developers/good-bye-typescript-enum

const TopPage: NextPage = () => {
  const router = useRouter();

  // ブックマークとして表示するレシピの取得状況
  const [
    bookmarkLoadingState,
    setBookmarkLoadingState,
  ] = useState<BookmarkLoadingState>("Loading");

  // ブックマークとして表示するレシピの配列
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<Recipe[]>([]);

  // 整列順序
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>(
    "BookmarkedDateReverseChronologicalOrder"
  );

  // 次のページへのリンクに付与されるクエリパラメーターの文字列
  const [nextRecipeAPIParamsString, setNextRecipeAPIParamsString] = useState<
    string | null
  >(null);

  // 前のページへのリンクに付与されるクエリパラメーターの文字列
  const [prevRecipeAPIParamsString, setPrevRecipeAPIParamsString] = useState<
    string | null
  >(null);

  useEffect(() => {
    (async () => {
      // 読み込み中の表示に切り替え
      setBookmarkLoadingState("Loading");

      // ブックマークのデータベースを初期化
      try {
        await initializeBookmark();
      } catch (e) {
        setBookmarkLoadingState("Error");
        return;
      }

      let state: BookmarkLoadingState;
      let page = router.query.page ? Number(router.query.page) : 1;
      let sortingOrder: SortingOrder =
        (router.query.sortingOrder as SortingOrder) ||
        "BookmarkedDateReverseChronologicalOrder";

      setSortingOrder(sortingOrder);

      let [prevPageExists, nextPageExists] = await prevOrNextPageExists(page);

      if (prevPageExists)
        setPrevRecipeAPIParamsString(
          new URLSearchParams({
            page: (page - 1).toString(),
            sortingOrder,
          }).toString()
        );
      else setPrevRecipeAPIParamsString(null);
      if (nextPageExists) {
        setNextRecipeAPIParamsString(
          new URLSearchParams({
            page: (page + 1).toString(),
            sortingOrder,
          }).toString()
        );
      } else setNextRecipeAPIParamsString(null);

      try {
        const recipes = await fetchBookmark(page, sortingOrder);
        setBookmarkedRecipes(recipes);
        state = "Loaded";
      } catch (e) {
        console.error(e);
        state = "Error";
      }
      setBookmarkLoadingState(state);
    })();
  }, [router.query]);

  // 整列順序が変更されたときは1ページ目からその順に表示させる
  const onSortingOrderSelectionChanged = (e) => {
    const newSortingOrder = e.target.value as SortingOrder;
    router.push(
      `/bookmark?${new URLSearchParams({
        page: "1",
        sortingOrder: newSortingOrder,
      })}`
    );
  };

  const recipeListProps = {
    recipes: bookmarkedRecipes,
    nextRecipeAPIParamsString,
    prevRecipeAPIParamsString,
  };

  return (
    <div>
      <Head title="料理板 ─ ブックマーク" />
      <Header />
      <div className="p-4 border-b-2">
        <select
          name="sorting-order-selector"
          id="sorting-order-selector"
          className="w-full"
          onChange={onSortingOrderSelectionChanged}
          defaultValue={sortingOrder}
        >
          {sortingOrders.map((so) => {
            return (
              <option value={so} key={so}>
                {sortingOrderToString(so)}
              </option>
            );
          })}
        </select>
      </div>
      {bookmarkLoadingState === "Loading" ? (
        <div>Loading...</div>
      ) : bookmarkLoadingState === "Error" ? (
        <div>Error</div>
      ) : (
        <RecipeList {...recipeListProps} />
      )}
    </div>
  );
};

export default TopPage;
