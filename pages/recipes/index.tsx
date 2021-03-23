import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPISearch from "../../recipe-api/getSearch";
import * as RecipeAPIAll from "../../recipe-api/getRecipes";
import { Recipe } from "../../@types/recipe-api/recipe";
import { QueryParameter } from "../../@types/recipe-api/getSearch";
import { RecipeList } from "../../components/RecipeList";
import { Header } from "../../components/Header";

type State =
  | {
    type: "LOADING";
  }
  | {
    type: "NOT_FOUND";
  }
  | {
    type: "LOADED";
    recipes: Recipe[];
  };

const SearchPage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ type: "LOADING" });
  const [query, setQuery] = useState<QueryParameter | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = query
          ? await RecipeAPISearch.searchRecipes(query)
          : await RecipeAPIAll.getRecipes();
        if (res === "NOT_FOUND") {
          setState({ type: "NOT_FOUND" });
          return;
        }

        const recipes = res.recipes ? res.recipes : [];
        setState({ type: "LOADED", recipes });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query]);

  useEffect(() => {
    const query = router.query.keyword
      ? {
        keyword: !Array.isArray(router.query.keyword)
          ? router.query.keyword
          : "",
      }
      : undefined;
    setQuery(query);
  }, [router.query.keyword]);

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "LOADED":
        return <RecipeList recipes={state.recipes} />;
      default: {
        const _exhaustiveCheck: never = state;
        return _exhaustiveCheck;
      }
    }
  };

  return (
    <div>
      <Header initialQuery={query ? query.keyword : ""} />
      {body()}
    </div>
  );
};

export default SearchPage;
