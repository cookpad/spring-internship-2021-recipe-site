import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipesId";
import { Recipe } from "../../@types/recipe-api/recipe";
import { Header } from "../../components/Header";
import { Steps } from "../../components/Steps";
import { Ingredients } from "../../components/Ingredients";

type State =
  | {
      type: "LOADING";
    }
  | {
      type: "NOT_FOUND";
    }
  | {
      type: "BAD_REQUEST";
    }
  | {
      type: "LOADED";
      recipe: Recipe;
    };

const RecipePage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ type: "LOADING" });

  useEffect(() => {
    (async () => {
      try {
        const id = Number(router.query.id);
        if (id === 0 || isNaN(id)) {
          setState({ type: "BAD_REQUEST" });
          return;
        }

        const recipe = await RecipeAPI.getRecipe(id);
        if (recipe === "NOT_FOUND") {
          setState({ type: "NOT_FOUND" });
          return;
        }

        setState({ type: "LOADED", recipe: recipe });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [router.query.id]);

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h1>Loading</h1>;
      case "NOT_FOUND":
        return <h1>Not Found</h1>;
      case "BAD_REQUEST":
        return <h2>Bad Request</h2>;
      case "LOADED":
        return (
          <div>
            <h2>{state.recipe.title}</h2>

            {state.recipe.image_url && (
              <img
                className="recipeImage"
                src={state.recipe.image_url}
                alt="レシピ画像"
              />
            )}

            <div className="recipeMetadata">
              <p>{state.recipe.author.user_name}</p>
              <p>{state.recipe.published_at}</p>
            </div>

            <p>{state.recipe.description}</p>

            <Ingredients ingredients={state.recipe.ingredients} />

            <Steps steps={state.recipe.steps} />
          </div>
        );
      default: {
        const _exhaustiveCheck: never = state;
        return _exhaustiveCheck;
      }
    }
  };

  return (
    <div>
      <Header initialQuery="" />
      {body()}
    </div>
  );
};

export default RecipePage;
