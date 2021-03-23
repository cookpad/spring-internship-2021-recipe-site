import React, { FC } from "react";
import { Recipe } from "../@types/recipe-api/recipe";

type Props = { recipes: Recipe[] };

export const RecipeList: FC<Props> = (props) => {
  return (
    <ul>
      {props.recipes.map((recipe, i) => (
        <li key={i}>
          {recipe.image_url && <img src={recipe.image_url} alt="レシピ画像" />}

          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
        </li>
      ))}
    </ul>
  );
};
