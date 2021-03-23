import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getRecipes";
import {
  APIResponse,
  QueryParameter,
} from "../../@types/recipe-api/getRecipes";
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
      response: APIResponse;
    };

const TopPage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ type: "LOADING" });
  const [query, setQuery] = useState<QueryParameter>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await RecipeAPI.getRecipes(query);
        setState({ type: "LOADED", response: res });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (router.query.page) {
      const query = Number(router.query.page);
      if (!query || isNaN(query)) {
        console.error("invelid query parameter");
        return;
      }

      setQuery({ page: query });
      return;
    }

    if (router.query.id) {
      const query = router.query.id;
      if (!Array.isArray(query)) {
        console.error("invelid query parameter");
        return;
      }

      setQuery({ id: query });
      return;
    }

    setQuery({});
    return;
  }, [router.query.page]);

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "LOADED":
        return <RecipeList response={state.response} />;
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

export default TopPage;
