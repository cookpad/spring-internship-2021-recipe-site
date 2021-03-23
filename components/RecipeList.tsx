import React, { FC } from "react";
import Link from "next/link";
import { Recipe } from "../@types/recipe-api/recipe";

type Props = { recipes: Recipe[] };

export const RecipeList: FC<Props> = (props) => {
  return (
    <ol className="recipeList">
      {props.recipes.map((recipe, i) => (
        <li key={i}>
          <article>
            <Link href={"/recipes/" + recipe.id.toString()}>
              <div className="recipeListItem">
                {recipe.image_url && (
                  <img src={recipe.image_url} alt="レシピ画像" />
                )}
                <div>
                  <h2>{recipe.title}</h2>
                  <p>{recipe.description}</p>
                </div>
              </div>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
};
