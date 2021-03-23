import React from 'react'
import type { NextPage } from 'next'
import { Router } from 'next/router'
import { getRecipeList } from '../lib/recipe'

import type { PagingLinks, Recipe } from '../types/recipe'
import { search } from '../lib/search'
import { SearchPage } from 'src/components/templates/searchPage'

const TopPage: NextPage = () => {
  const [recipeList, setRecipeList] = React.useState<Recipe[] | null>(null)
  const [pagingLink, setPagingLink] = React.useState<PagingLinks | null>(null)
  const [searchWord, setSearchWord] = React.useState<string>('')
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

  const handleOnClickSearch = async () => {
    if (searchWord !== '') {
      const response = await search(searchWord)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
    } else {
      return null
    }
  }

  const handleOnClickSelect = (index: number) => {
    setSelectedIndex(index)
    // TODO: ここからページ遷移できればいいなと思う
  }

  // 初期処理
  const init = async () => {
    const response = await getRecipeList(null)
    setRecipeList(response.recipes)
    setPagingLink(response.links)
  }
  React.useEffect(() => {
    init()
  }, [])
  if (recipeList === null) {
    return <div>loading...</div>
  }

  return (
    <SearchPage
      recipeList={recipeList}
      searchWord={searchWord}
      onClickSearch={handleOnClickSearch}
      onChangeSearch={(e) => setSearchWord(e)} // TODO: よくわかっていない
      onClickSelect={(e) => handleOnClickSelect(e)}
    />
  )
}

export default TopPage
