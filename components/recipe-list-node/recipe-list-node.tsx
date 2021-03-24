import { FC } from 'react';
import type { Recipe } from '../../lib/recipe'

import css from './recipe-list-node.module.css'

import Link from 'next/link';

type RecipeListNodeProps = {
  recipes: Recipe[];  
}

const RecipeListNode: FC<RecipeListNodeProps> = ({ recipes }) => {
  return (
    
    <div className={css.recipeListNodeContainer}>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <div className={css.recipeContainer}>
              <div className={css.recipeImage}>
                {recipe.image_url &&
                <img src={recipe.image_url} alt="recipe-image" width='200'/>
                }
              </div>
              <div className={css.recipeText}>
                <h2>
                  <Link href={`/recipes/${recipe.id}`}>
                    {recipe.title}
                  </Link>
                </h2>
                <p>{recipe.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListNode;
