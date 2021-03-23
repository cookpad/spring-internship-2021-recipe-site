import React, { FC } from "react";
import { useRouter } from "next/router";
import * as GetRecipes from "../@types/recipe-api/getRecipes";
import * as SearchRecipes from "../@types/recipe-api/getSearch";

type Props = {
  response: GetRecipes.APIResponse | SearchRecipes.APISuccessResponse;
  currentPage: number;
};

export const Page: FC<Props> = (props) => {
  const router = useRouter();

  const previous = () => {
    if (props.response.links.prev) router.push(props.response.links.prev);
  };

  const next = () => {
    if (props.response.links.next) router.push(props.response.links.next);
  };

  const isPreviousExists = props.response.links.prev != null;
  const isNextExists = props.response.links.next != null;
  return (
    <div className="footer">
      <button onClick={previous} disabled={!isPreviousExists}>
        前へ
      </button>
      <button onClick={next} disabled={!isNextExists}>
        次へ
      </button>
    </div>
  );
};
