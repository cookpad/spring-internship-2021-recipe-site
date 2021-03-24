import React, { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { getRecipe } from '../../lib/recipe';
import { DateTimeFormatter } from '../../public/DateTimeFormatter';

import style from './recipe-id.module.css';

import type { Recipe } from '../../lib/recipe';

import Link from 'next/link';
import SearchBar from '../../components/SearchBar/search-bar';

const RecipeDetail: FC = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    (async () => {
      const id = Number(router.query.id);
      if (id === 0 || isNaN(id)) {
        setRecipe(null);
      } else {
          const recipe = await getRecipe(id);
          setRecipe(recipe);
      }
    })();
  }, [router.query.id]);

  return (
    <>
      <h1>
        <Link href='/recipes'>
          レピログ
        </Link>
      </h1>
      <SearchBar />
      {recipe && 
        <div className={style.recipeDetailContainer}>
          <div>
            {recipe.image_url &&
              <img src={recipe.image_url} alt="recipe-image" width='600'/>
            }
          </div>
          <h2>{recipe.title}</h2>
          <div className={style.recipeAuthorPublishAt}>
            <div className={style.recipeAuthor}>
              {recipe.author.user_name}
            </div>
            <div className={style.recipePublishAt}>
              {DateTimeFormatter(recipe.published_at)}
            </div> 
          </div>
          <div>
            {recipe.description}
          </div>
          <div>
            <h2>材料</h2>
            <div>
              <ul>
                {recipe.ingredients.map((ingredient,i) => (
                  <li key={i}>
                    {ingredient.name}
                    {ingredient.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <h2>手順</h2>
              <ol>
                {recipe.steps.map((step,i) => (
                  <li key={i}>
                    {step}
                  </li>
                ))}
              </ol>
          </div>
        </div>
      }
    </>
  );
}

export default RecipeDetail;
