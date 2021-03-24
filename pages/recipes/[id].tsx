import { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "../../components/head";
import Header from "../../components/header";
import { getRecipe, Recipe } from "../../lib/client/recipe";
import { toggleBookmark } from "../../lib/client/bookmark";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

const RecipePage: NextPage = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let recipe: Recipe;
      try {
        recipe = await getRecipe(Number(router.query.id));
        setRecipe(recipe);
      } catch (e) {
        setError(e.message);
      }
      setRecipe(recipe);
    })();
  }, []);

  const onClickBookmarkButton = async () => {
    const added = await toggleBookmark(recipe.id);
    setBookmarked(added);
  };

  if (error === null && recipe === null)
    return (
      <div>
        <Head title="読込中 ─ 料理板" description="" image="" />
        <Header />
        <div>Loading...</div>
      </div>
    );
  if (error !== null)
    return (
      <div>
        <Head title="エラー ─ 料理板" description="" image="" />
        <Header />
        <div>{error}</div>
      </div>
    );

  return (
    <div>
      <Head
        title={`${recipe.title} ─ 料理板`}
        description={recipe.description}
        image={recipe.image_url}
      />
      <Header />
      {recipe && (
        <main>
          {recipe.image_url ? (
            <div className="w-full">
              <Image
                src={recipe.image_url}
                alt="レシピ画像"
                width={400}
                height={250}
                objectFit="contain"
              />
            </div>
          ) : (
            // レシピ画像が無い場合は絵文字を表示
            <p className="text-9xl text-center">🍽️</p>
          )}

          <h2 className="text-xl mt-3 mb-2 mx-4">{recipe.title}</h2>

          <div className="flex justify-between">
            <span className="m-2 ml-4">{recipe.author.user_name}</span>
            <span className="m-2 mr-4">
              {new Date(recipe.published_at).toLocaleDateString()}
            </span>
          </div>

          <p className="m-3">{recipe.description}</p>

          <div className="flex justify-center">
            <button
              className="text-lg p-2 mx-5 my-2 mb-4 bg-yellow-200 hover:bg-yellow-300 font-bold rounded"
              onClick={onClickBookmarkButton}
            >
              {bookmarked ? "📌 レシピを保存" : "🗑️ ブックマーク解除"}
            </button>
          </div>

          <h3 className="px-2 py-1 bg-gray-300 mb-2">材料</h3>
          <div className="divide-y">
            {recipe.ingredients
              .filter((ing) => ing.name !== "")
              .map((ing, i) => (
                <div className="flex justify-between">
                  <span className="font-semibold m-2 ml-4">{ing.name}</span>
                  <span className="m-2 mr-4">{ing.quantity}</span>
                </div>
              ))}
          </div>

          <h3 className="px-2 py-1 bg-gray-300 mb-2">手順</h3>
          <ol className="divide-y list-decimal list-inside">
            {recipe.steps.map((step, i) => (
              <li className="p-2">{step}</li>
            ))}
          </ol>
        </main>
      )}
    </div>
  );
};

export default RecipePage;
