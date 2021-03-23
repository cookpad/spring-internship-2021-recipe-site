import React, { FC } from "react";
import { SearchForm } from "./SearchForm";

type Props = { initialQuery: string };

export const Header: FC<Props> = (props) => {
    return (
        <div>
            <h1>サイト名</h1>
            <SearchForm initialQuery={props.initialQuery} />
        </div>
    );
};
