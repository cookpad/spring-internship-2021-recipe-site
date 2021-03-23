import { GetServerSideProps, NextPage } from "next";
import Header from "../../components/header";
import { getRecipe, Recipe } from "../../lib/recipe";

type Props = {
  // ページで表示するレシピ
  recipe: Recipe;
};

const RecipePage: NextPage<Props> = (props) => {
  const { recipe } = props;

  return (
    <div>
      <Header />
      {recipe && (
        <main>
          {recipe.image_url ? (
            <img src={recipe.image_url} alt="レシピ画像" className="w-full" />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id);
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    };
  } else {
    let recipe: Recipe;

    // 該当 ID のレシピが存在しない場合は not found を返す。
    // それ以外のエラーに今は対応せず、とりあえず例外を投げる
    try {
      recipe = await getRecipe(id);
    } catch (e) {
      if (e.message == "Not Found") return { notFound: true };
      else throw e;
    }
    return {
      props: { recipe: recipe },
    };
  }
};

export default RecipePage;
