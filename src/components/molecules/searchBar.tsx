import React from 'react'
import { MyButton } from '../atoms/myButton'
import { MyInput } from '../atoms/myInput'

export type SearchBarPropType = {
  classNameInput: string
  value: string
  onChange: (text: string) => void

  classNameButton: string
  onClick: () => void
}

export const SearchBar: React.VFC<SearchBarPropType> = ({
  classNameInput,
  value,
  onChange,
  classNameButton,
  onClick,
}) => {
  return (
    <div>
      <MyInput
        className={classNameInput}
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />

      <MyButton className={classNameButton} title="検索" onClick={onClick} />
    </div>
  )
}
