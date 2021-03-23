import Link from "next/link";
import next, { NextPage } from "next";
import { FC } from "react";
import { getRecipes, Recipe } from "../lib/recipe";
import Header from "../components/header";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

/**
 * レシピ一覧での各レシピの表示に利用するコンポーネント
 */
const RecipeListElementComponent: FC<{ recipe: Recipe }> = ({
  children,
  recipe,
}) => {
  return (
    <a href={`recipes/${recipe.id}`} className="block">
      <div
        className="recipe-element-container flex items-center m-4"
        key={recipe.id}
      >
        <div className="recipe-image-container mr-4 flex-1">
          {recipe.image_url ? (
            <img
              src={recipe.image_url}
              alt="レシピ画像"
              className="inline-block"
            />
          ) : (
            // レシピ画像がないときは絵文字を表示する
            <p className="text-8xl text-center">🍽️</p>
          )}
        </div>
        <div className="recipe-summary flex-1">
          <h2 className="recipe-title text-l mb-2">{recipe.title}</h2>
          <p className="recipe-description text-sm">{recipe.description}</p>
        </div>
      </div>
    </a>
  );
};

/**
 * トップページ
 */
const TopPage: NextPage<Props> = (props) => {
  const {
    recipes,
    nextRecipeAPIParamsString: nextAPIParamsString,
    prevRecipeAPIParamsString: prevAPIParamsString,
  } = props;

  return (
    <div>
      <Header />

      <div className="divide-y-4">
        {recipes.map((recipe) => (
          <RecipeListElementComponent recipe={recipe} />
        ))}
      </div>

      <footer className="flex justify-between m-4">
        <div>
          {prevAPIParamsString !== null && (
            <a href={`?${prevAPIParamsString}`}>前のページ</a>
          )}
        </div>
        <div>
          {nextAPIParamsString !== null && (
            <a href={`?${nextAPIParamsString.toString()}`}>次のページ</a>
          )}
        </div>
      </footer>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const response = await getRecipes({
    page: query.page,
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
