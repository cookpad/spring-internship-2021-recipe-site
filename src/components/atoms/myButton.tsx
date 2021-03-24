import { Button } from '@material-ui/core'
import React from 'react'

export type MyButtonPropType = {
  className: string
  title: string
  onClick: () => void
}

// TODO: オーバーロードができない
// （型がstringではなく特定のものであるのが起因しているみたいだけど何をすればいいのかがわからない）
export const MyButton: React.VFC<MyButtonPropType> = ({
  className,
  title,
  onClick,
}) => {
  return (
    <Button className={className} onClick={onClick}>
      {title}
    </Button>
  )
}
