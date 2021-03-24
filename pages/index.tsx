import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Head from "../components/head";
import Header from "../components/header";
import RecipeList from "../components/recipe-list";
import { getRecipe, getRecipes, Recipe } from "../lib/client/recipe";

const TopPage: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [nextRecipeAPIParamsString, setNextRecipeAPIParamsString] = useState<
    string | null
  >(null);
  const [prevRecipeAPIParamsString, setPrevRecipeAPIParamsString] = useState<
    string | null
  >(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      // URL 内のページ番号の箇所 ?page=XXX を抽出。存在しない場合は 1 とする
      const page = router.query.page ? Number(router.query.page) : 1;

      // レシピ取得 API を叩く
      const response = await getRecipes({ page });
      setRecipes(response.recipes);

      let nextRecipeAPIParamsString;
      let prevRecipeAPIParamsString;
      if (response.links) {
        nextRecipeAPIParamsString = response.links.next
          ? new URL(response.links.next).searchParams.toString()
          : null;
        prevRecipeAPIParamsString = response.links.prev
          ? new URL(response.links.prev).searchParams.toString()
          : null;
      }
      setNextRecipeAPIParamsString(nextRecipeAPIParamsString);
      setPrevRecipeAPIParamsString(prevRecipeAPIParamsString);
    })();
  }, [router.query]);

  return (
    <div>
      <Head
        title="料理板"
        description="レシピ検索No.?／料理レシピ載せるなら 料理板"
        image="https://placehold.jp/1200x630.png"
      />
      <Header />
      {recipes === null ? (
        <div>loading...</div>
      ) : (
        <RecipeList
          recipes={recipes}
          nextRecipeAPIParamsString={nextRecipeAPIParamsString}
          prevRecipeAPIParamsString={prevRecipeAPIParamsString}
        />
      )}
    </div>
  );
};

export default TopPage;
