import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { QueryParameter } from "../@types/recipe-api/getSearch";

type Props = {
  initialQuery: string;
};

export const SearchForm: FC<Props> = (props) => {
  const router = useRouter();

  const updateQuery = (queryString: string) => {
    const query: QueryParameter = { keyword: queryString };
    router.push({ pathname: "/recipes/search", query: query });
  };

  return (
    <SearchInput
      initialQuery={props.initialQuery}
      queryChangeHandler={updateQuery}
    />
  );
};

const SearchInput: FC<{
  initialQuery: string;
  queryChangeHandler: (query: string) => void;
}> = (props) => {
  const [text, setText] = useState<string>(props.initialQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.queryChangeHandler(text);
    event.preventDefault();
  };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-query"
          placeholder="検索"
          spellCheck="true"
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
};
