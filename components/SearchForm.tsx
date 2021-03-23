import React, { FC, useState } from "react";

type Props = {
  initialQuery: string;
  queryChangeHandler: (query: string) => void;
};

export const SearchForm: FC<Props> = (props) => {
  const [text, setText] = useState<string>(props.initialQuery);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    props.queryChangeHandler(text);
    event.preventDefault();
  };

  return (
    <div>
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
