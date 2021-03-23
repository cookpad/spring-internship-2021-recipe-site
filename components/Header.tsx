import React, { FC } from "react";
import Link from "next/link";
import { SearchForm } from "./SearchForm";

type Props = { initialQuery: string };

export const Header: FC<Props> = (props) => {
  return (
    <div className="header">
      <Link href="/">
        <h1 className="title">サイト名</h1>
      </Link>
      <SearchForm initialQuery={props.initialQuery} />
    </div>
  );
};
