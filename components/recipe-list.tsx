import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FC } from "react";
import { Recipe } from "../lib/recipe";
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
  const router = useRouter();

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
          {prevRecipeAPIParamsString != null && (
            <Link href={`${router.basePath}?${prevRecipeAPIParamsString}`}>
              前のページ
            </Link>
          )}
        </div>
        <div>
          {nextRecipeAPIParamsString != null && (
            <Link
              href={`${
                router.basePath
              }?${nextRecipeAPIParamsString.toString()}`}
            >
              次のページ
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default RecipeList;
