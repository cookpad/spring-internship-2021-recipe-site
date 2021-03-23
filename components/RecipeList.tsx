import React, { FC } from "react";
import Link from "next/link";
import * as GetRecipes from "../@types/recipe-api/getRecipes";
import * as SearchRecipes from "../@types/recipe-api/getSearch";
import { Page } from "./Page";

type Props = {
  response: GetRecipes.APIResponse | SearchRecipes.APISuccessResponse;
  previous?: () => void;
  next?: () => void;
};

export const RecipeList: FC<Props> = (props) => {
  return (
    <div>
      <ol className="recipeList">
        {props.response.recipes.map((recipe, i) => (
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

      <Page previous={props.previous} next={props.next} />
    </div>
  );
};
