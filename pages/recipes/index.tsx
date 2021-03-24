import React, { FC, useEffect, useState } from "react";

import { getRecipes } from "../../lib/recipe";

import RecipeListNode from '../../components/recipe-list-node/recipe-list-node';
import Button from '../../components/button/button';
import SearchBar from '../../components/SearchBar/search-bar';

import type { Recipe } from '../../lib/recipe';
import type { Links } from '../../lib/recipe';
import Link from "next/link";


const TopPage: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [links, setLinks] = useState<Links>()

  const firstState = () => {
    (async () => {
      const result = await getRecipes();
      setLinks(result.links);
      setRecipes(result.recipes);
    })();
  };

  useEffect(() => {
    firstState();
  }, []);

  const handleClick = (recipes: Recipe[], links: Links): void => {
    setRecipes(recipes);
    setLinks(links);
  };

  
  return (
    <>
      <h1 onClick={firstState}>
        <Link href='/recipes'>
          レピログ
        </Link>
      </h1>      
      <SearchBar />
      {!recipes && <p>検索条件に一致するレシピは存在しません</p>}
      {recipes &&<RecipeListNode recipes={recipes}/>}
      {links?.prev &&
        <Button 
          buttonText='前のページ'
          link={links.prev}
          handleClick={handleClick}
        />
      }
      {links?.next &&
        <Button 
          buttonText='次のページ'
          link={links.next}
          handleClick={handleClick}
        />      
      }
    </>
  );
};

export default TopPage;
