import React from 'react'

export type InputPropType = {
  className: string
  placeholder: string
  value: string
  onChange: (text: string) => void
}

export const MyInput: React.VFC<InputPropType> = ({
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <input
        className={className}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
