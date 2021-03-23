import { GetServerSideProps, NextPage } from "next";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import {
  getRecipes,
  Recipe,
  searchRecipes,
  SearchRecipesResponse,
} from "../lib/recipe";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // レシピが一件以上検索でヒットしたか
  recipeFound: boolean;

  // 検索欄に入力されたキーワード
  keyword?: string;

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

const TopPage: NextPage<Props> = (props) => {
  return (
    <div>
      <Header searchQuery={props.keyword} />
      {props.recipeFound ? (
        <RecipeList {...props} />
      ) : (
        <div>
          <h1 className="text-center m-2">
            該当するレシピは見つかりませんでした。
          </h1>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.keyword)
    return {
      redirect: {
        statusCode: 301,
        destination: "/",
      },
    };

  let response: SearchRecipesResponse;
  try {
    response = await searchRecipes({
      keyword: query.keyword as string,
      page: Number(query.page as string),
    });
  } catch (e) {
    if (e.message == "Not Found") {
      return {
        props: {
          recipes: [],
          recipeFound: false,
          keyword: query.keyword,
        } as Props,
      };
    } else throw e;
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
  return {
    props: {
      recipes: response.recipes,
      recipeFound: true,
      keyword: query.keyword,
      nextRecipeAPIParamsString,
      prevRecipeAPIParamsString,
    } as Props,
  };
};

export default TopPage;
