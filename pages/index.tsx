import { GetServerSideProps, NextPage } from "next";
import Head from "../components/head";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import { getRecipes, Recipe } from "../lib/client/recipe";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

const TopPage: NextPage<Props> = (props) => {
  const {
    recipes,
    nextRecipeAPIParamsString,
    prevRecipeAPIParamsString,
  } = props;

  return (
    <div>
      <Head
        title="料理板"
        description="レシピ検索No.?／料理レシピ載せるなら 料理板"
        image="https://placehold.jp/1200x630.png"
      />
      <Header />
      {recipes === null ? (
        <div>やっています……</div>
      ) : (
        <RecipeList
          recipes={recipes}
          nextRecipeAPIParamsString={nextRecipeAPIParamsString}
          prevRecipeAPIParamsString={prevRecipeAPIParamsString}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await getRecipes({
    page: Number(query.page as string),
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
