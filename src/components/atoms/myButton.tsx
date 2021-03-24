import { Button } from '@material-ui/core'
import React from 'react'

export type MyButtonPropType = {
  className: string
  title: string
  type: 'submit'
}

// TODO: オーバーロードができない
// （型がstringではなく特定のものであるのが起因しているみたいだけど何をすればいいのかがわからない）
export const MyButton: React.VFC<MyButtonPropType> = ({
  className,
  title,
  type,
}) => {
  return (
    <Button className={className} type={type}>
      {title}
    </Button>
  )
}
