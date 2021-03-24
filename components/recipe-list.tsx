import Link from "next/link";
import next, { NextPage } from "next";
import { FC } from "react";
import { getRecipes, Recipe } from "../lib/client/recipe";
import Header from "./header";
import RecipeListElement from "./recipe-list-element";

type Props = {
  // このページで表示するレシピのリスト
  recipes: Recipe[];

  // ページネーション可能なとき、次のページに遷移するときに利用するパラメータを格納
  nextRecipeAPIParamsString?: string;

  // ページネーション可能なとき、前のページに遷移するときに利用するパラメータを格納
  prevRecipeAPIParamsString?: string;
};

/**
 * トップページ
 */
const RecipeList: FC<Props> = (props) => {
  const {
    recipes,
    nextRecipeAPIParamsString,
    prevRecipeAPIParamsString,
  } = props;

  return (
    <div>
      <div className="divide-y-4">
        {recipes.map((recipe) => (
          <RecipeListElement key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <footer className="flex justify-between m-4">
        <div>
          {prevRecipeAPIParamsString !== null && (
            <Link href={`/?${prevRecipeAPIParamsString}`}>前のページ</Link>
          )}
        </div>
        <div>
          {nextRecipeAPIParamsString !== null && (
            <Link href={`/?${nextRecipeAPIParamsString.toString()}`}>
              次のページ
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default RecipeList;
