import React from "react";
import Link from "next/link";
import { getRecipeList } from "../lib/recipe";

import type { GetServerSideProps, NextPage } from "next";
import type { PagingLinks, Recipe } from "../types/recipe";
import { search } from "../lib/search";

const Home: NextPage = () => {
  let work: string
  const [recipeList, setRecipeList] = React.useState<Recipe[] | null>(null)
  const [pagingLink, setPagingLink] = React.useState<PagingLinks | null>(null)
  const [searchWord, setSearchWord] = React.useState<string>("")

  const init = async () => {
    const response = await getRecipeList(null);
    setRecipeList(response.recipes)
    setPagingLink(response.links)
  }

  React.useEffect(() => {
    init()
  }, [])

  const handleOnSearch = async () => {
    if (searchWord !== "") {
      const response = await search(searchWord)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
    } else {
      return null
    }
  }

  if (recipeList === null) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>My Recipe Site</h1>

      <h2>検索</h2>
      <input 
      type="text" 
      placeholder="search"
      value={searchWord}
      onChange={e => setSearchWord(
        e.target.value
      )}
       />
      
      {/* TODO: デザイン整える */}
      <input 
      type="button"
      placeholder="検索"
      onClick={() => handleOnSearch()}
      />
      

      <ul>
        {recipeList.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Home;