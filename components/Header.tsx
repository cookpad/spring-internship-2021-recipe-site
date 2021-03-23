import React, { FC } from "react";
import { SearchForm } from "./SearchForm";

type Props = { initialQuery: string };

export const Header: FC<Props> = (props) => {
  return (
    <div>
      <SearchForm initialQuery={props.initialQuery} />
    </div>
  );
};
