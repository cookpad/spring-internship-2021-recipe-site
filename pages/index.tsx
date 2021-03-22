import Link from "next/link";
import { getRecipeList } from "../lib/recipe";

import type { GetServerSideProps, NextPage } from "next";
import type { PagingLinks, Recipe } from "../types/recipe";

type Props = {
  recipes: Recipe[],
  links: PagingLinks
};

const Home: NextPage<Props> = (props) => {
  const { recipes } = props;

  return (
    <div>
      <h1>My Recipe Site</h1>

      <h2>検索</h2>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
      {/* {links} */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getRecipeList(null);
  return {
    props: {
      recipes: res.recipes,
      links: res.links
    },
  };
};

export default Home;