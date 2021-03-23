import { FC } from "react";
import { Recipe } from "../lib/recipe";

/**
 * レシピ一覧での各レシピの表示に利用するコンポーネント
 */
const RecipeListElement: FC<{ recipe: Recipe }> = ({ children, recipe }) => {
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

export default RecipeListElement;
