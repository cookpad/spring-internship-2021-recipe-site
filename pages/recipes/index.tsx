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
  }, [router.query.page, router.query.id]);

  const body = () => {
    switch (state.type) {
      case "LOADING":
        return <h2>Loading</h2>;
      case "NOT_FOUND":
        return <h2>Not Found</h2>;
      case "LOADED": {
        const previousBody = () => {
          const page = "page" in query ? query.page : 1;
          const newQuery: QueryParameter = { page: page - 1 };
          router.push({ pathname: "/recipes", query: newQuery });
        };
        const previous =
          !("id" in query) && state.response.links.prev
            ? previousBody
            : undefined;

        const nextBody = () => {
          const page = "page" in query ? query.page : 1;
          const newQuery: QueryParameter = { page: page + 1 };
          router.push({ pathname: "/recipes", query: newQuery });
        };
        const next =
          !("id" in query) && state.response.links.next ? nextBody : undefined;

        return (
          <RecipeList
            response={state.response}
            previous={previous}
            next={next}
          />
        );
      }
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
