import Link from 'next/link'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { Recipe } from 'src/types/recipe'
import { Header } from 'src/components/organisms/header'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    cover: {
      width: 150,
      height: 150,
    },
    content: {
      margin: theme.spacing(5),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    inline: {
      display: 'inline',
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      width: '70%',
    },
    paging: {
      margin: theme.spacing(5),
    },
  }),
)

export type SearchPagePropType = {
  recipeList: Recipe[]
  searchWord: string
  onClickSearch: () => void
  onChangeSearch: (text: string) => void
  onClickNext: () => void
  onClickPrev: () => void
}
export const SearchPage: React.VFC<SearchPagePropType> = ({
  recipeList,
  searchWord,
  onClickSearch,
  onChangeSearch,
  onClickNext,
  onClickPrev,
}) => {
  const classes = useStyles()

  return (
    <div>
      <Header
        headerTitle="レシピ検索サイト"
        inputValue={searchWord}
        onChange={onChangeSearch}
        onClick={onClickSearch}
      />

      {/* 案1 */}
      {/* <input
        className={classes.input}
        type="text"
        placeholder="search"
        value={searchWord}
        onChange={(e) => onChangeSearch(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => onClickSearch()}
      >
        検索
      </Button> */}

      <div>
        <List className={classes.root}>
          {recipeList.map((recipe) => (
            <div key={recipe.id}>
              <ListItem alignItems="flex-start" button key={recipe.id}>
                <ListItemAvatar>
                  <Avatar
                    className={classes.large}
                    src={`${recipe.image_url}`}
                  />
                </ListItemAvatar>

                {/* TODO: ページ遷移の部分、改良の余地あり */}
                <Link href={'recipes/' + recipe.id}>
                  {/* TODO: 文字のデザイン変更 */}
                  <ListItemText
                    className={classes.content}
                    primary={`${recipe.title}`}
                    secondary={`${recipe.description}`}
                  />
                </Link>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ))}
        </List>
      </div>

      <div>
        {/* TODO: 内容が保持されていなければ可視化されないようにする */}
        <Button
          className={classes.paging}
          variant="contained"
          color="secondary"
          onClick={() => onClickPrev()}
        >
          preview
        </Button>

        {/* TODO: 同上 */}
        <Button
          className={classes.paging}
          variant="contained"
          color="secondary"
          onClick={() => onClickNext()}
        >
          next
        </Button>
      </div>
    </div>
  )
}
