import Link from "next/link";
import { NextPage } from "next";
import { FC } from "react";
import { getRecipes, Recipe } from "../lib/recipe";

type Props = {
  recipes: Recipe[];
};

const RecipeComponent: FC<{ recipe: Recipe }> = ({ children, recipe }) => {
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
            <p>🍽️</p>
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

const TopPage: NextPage<Props> = (props) => {
  const { recipes } = props;

  return (
    <div>
      <h1 className="text-xl font-semibold">料理検索</h1>

      <div className="divide-y-4">
        {recipes.map((recipe) => (
          <RecipeComponent recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await getRecipes();
  return {
    props: {
      recipes: response.recipes,
    },
  };
};

export default TopPage;
