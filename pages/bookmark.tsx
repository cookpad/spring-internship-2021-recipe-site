import { GetServerSideProps, NextPage } from "next";
import Head from "../components/head";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import { getRecipes, Recipe } from "../lib/recipe";
import { fetchBookmark } from "../lib/bookmark";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

const TopPage: NextPage<Props> = (props) => {
  return (
    <div>
      <Head
        title="料理板"
        description="レシピ検索No.?／料理レシピ載せるなら 料理板"
        image="https://placehold.jp/1200x630.png"
      />
      <Header />
      <RecipeList {...props} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page ? Number(query.page) : 1;
  const recipeIDs = await fetchBookmark(page);

  const response = await getRecipes({
    id: recipeIDs.join(","),
    page,
  });

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
  return {
    props: {
      recipes: response.recipes,
      nextRecipeAPIParamsString,
      prevRecipeAPIParamsString,
    } as Props,
  };
};

export default TopPage;
