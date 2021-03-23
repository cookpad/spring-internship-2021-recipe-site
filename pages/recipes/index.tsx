import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipes";
import { Recipe } from "../../@types/recipe-api/recipe";
import { RecipeList } from "../../components/RecipeList";

type State =
  | {
      type: "LOADING";
    }
  | {
      type: "LOADED";
      recipes: Recipe[];
    };

const SearchPage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ type: "LOADING" });

  useEffect(() => {
    (async () => {
      try {
        const res = await RecipeAPI.getRecipes();
        setState({ type: "LOADED", recipes: res.recipes });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [router.query.id]);

  switch (state.type) {
    case "LOADING":
      return <h1>Loading</h1>;
    case "LOADED":
      return <RecipeList recipes={state.recipes} />;
    default: {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
    }
  }
};

export default SearchPage;
