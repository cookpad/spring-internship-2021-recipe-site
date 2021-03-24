import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { SearchPage } from 'src/components/templates/searchPage'
import { getRecipeList } from 'src/lib/recipe'
import { search } from 'src/lib/search'
import { PagingLinks, Recipe } from 'src/types/recipe'

const Search: NextPage = () => {
  const router = useRouter()
  const keyword = String(router.query.keyword)
  const [recipeList, setRecipeList] = React.useState<Recipe[] | null>(null)
  const [pagingLink, setPagingLink] = React.useState<PagingLinks | null>(null)

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
  const init = async () => {
    const response = await search(keyword)
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
      onClickNext={handleOnClickNext}
      onClickPrev={handleOnClickPrev}
    />
  )
}

export default Search
