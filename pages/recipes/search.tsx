import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as RecipeAPI from "../../recipe-api/getSearch";
import {
  QueryParameter,
  APISuccessResponse,
} from "../../@types/recipe-api/getSearch";
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
      response: APISuccessResponse;
    };

const SearchPage: FC = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({ type: "LOADING" });
  const [query, setQuery] = useState<QueryParameter | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        if (!query) {
          return;
        }

        const res = await RecipeAPI.searchRecipes(query);
        if (res === "NOT_FOUND") {
          setState({ type: "NOT_FOUND" });
          return;
        }

        setState({ type: "LOADED", response: res });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [query]);

  useEffect(() => {
    const keywordString = router.query.keyword;
    if (!keywordString || Array.isArray(keywordString)) {
      setQuery(undefined);
      return;
    }

    const query: QueryParameter = {
      keyword: keywordString as string,
    };

    const page = Number(router.query.page);
    if (!isNaN(page)) {
      query.page = page;
      return;
    }

    setQuery(query);
  }, [router.query.keyword, router.query.page]);

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
      <Header initialQuery={query ? query.keyword : ""} />
      {body()}
    </div>
  );
};

export default SearchPage;
