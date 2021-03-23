import Link from 'next/link'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { Recipe } from 'src/types/recipe'

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
      flex: '1 0 auto',
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
  }),
)

export type SearchPagePropType = {
  recipeList: Recipe[]
  searchWord: string
  onClickSearch: () => void
  onChangeSearch: (text: string) => void
  onClickSelect: (index: number) => void
}
export const SearchPage: React.VFC<SearchPagePropType> = ({
  recipeList,
  searchWord,
  onClickSearch,
  onChangeSearch,
  onClickSelect,
}) => {
  const classes = useStyles()

  return (
    <div>
      <h1>たけたけレシピ</h1>

      <input
        className={classes.input}
        type="text"
        placeholder="search"
        value={searchWord}
        onChange={(e) => onChangeSearch(e.target.value)}
      />

      {/* TODO: デザイン整える */}
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => onClickSearch()}
      >
        検索
      </Button>
      {/* <input type="button" placeholder="検索" onClick={() => onClickSearch()} /> */}

      {/* 案1 */}
      <div>
        <List className={classes.root}>
          {recipeList.map((recipe) => (
            <div key={recipe.id}>
              <ListItem
                alignItems="flex-start"
                button
                key={recipe.id}
                onClick={() => onClickSelect(recipe.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    className={classes.large}
                    src={`${recipe.image_url}`}
                  />
                </ListItemAvatar>

                {/* TODO: 改良の余地あり */}
                <Link href={'recipes/' + recipe.id}>
                  <ListItemText
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
      {/* <div className={classes.root}> */}
      {/* {recipeList.map((recipe) => (
        <Card
          className={classes.root}
          key={recipe.id}
          // onClick={() => onClickSelect(recipe.id)}
        >
          <CardMedia className={classes.cover} image={`${recipe.image_url}`} />

          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {recipe.title}
              </Typography>
            </CardContent>

          </div>
        </Card>
      ))} */}
    </div>
  )
}
