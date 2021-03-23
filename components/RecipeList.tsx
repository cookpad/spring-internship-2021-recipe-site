import React, { FC } from "react";
import Link from "next/link";
import { Recipe } from "../@types/recipe-api/recipe";

type Props = { recipes: Recipe[] };

export const RecipeList: FC<Props> = (props) => {
  return (
    <div>
      {props.recipes.map((recipe, i) => (
        <article key={i}>
          <Link href={"/recipes/" + recipe.id.toString()}>
            <div>
              {recipe.image_url && (
                <img src={recipe.image_url} alt="レシピ画像" />
              )}

              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};
