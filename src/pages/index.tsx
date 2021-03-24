import React from 'react'
import type { NextPage } from 'next'
import { getRecipeList } from '../lib/recipe'

import type { PagingLinks, Recipe } from '../types/recipe'
import { search } from '../lib/search'
import { SearchPage } from 'src/components/templates/searchPage'

const TopPage: NextPage = () => {
  const [recipeList, setRecipeList] = React.useState<Recipe[] | null>(null)
  const [pagingLink, setPagingLink] = React.useState<PagingLinks | null>(null)
  const [searchWord, setSearchWord] = React.useState<string>('')

  const handleOnClickSearch = async () => {
    if (searchWord !== '') {
      const response = await search(searchWord)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
    } else {
      return null
    }
  }

  const handleOnClickNext = async () => {
    if (pagingLink && pagingLink.next) {
      const response = await getRecipeList(pagingLink.next)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
      window.scrollTo(0, 0)
    } else {
      return null
    }
  }

  const handleOnClickPrev = async () => {
    if (pagingLink && pagingLink.prev) {
      const response = await getRecipeList(pagingLink.prev)
      setRecipeList(response.recipes)
      setPagingLink(response.links)
      window.scrollTo(0, 0)
    } else {
      return null
    }
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
      onClickNext={handleOnClickNext}
      onClickPrev={handleOnClickPrev}
    />
  )
}

export default TopPage
