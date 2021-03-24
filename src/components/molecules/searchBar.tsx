import router from 'next/router'
import React, { FormEvent } from 'react'
import { MyButton } from '../atoms/myButton'
import { MyInput } from '../atoms/myInput'

export type SearchBarPropType = {
  classNameInput: string
  classNameButton: string
}

export const SearchBar: React.VFC<SearchBarPropType> = ({
  classNameInput,
  classNameButton,
}) => {
  const [searchWord, setSearchWord] = React.useState<string>('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search/?keyword=${encodeURIComponent(searchWord)}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <MyInput
        className={classNameInput}
        placeholder="Search..."
        value={searchWord}
        onChange={setSearchWord}
      />

      <MyButton className={classNameButton} title="検索" type="submit" />
    </form>
  )
}
