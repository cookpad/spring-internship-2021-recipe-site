import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { Header } from '../organisms/header'
import { Recipe } from 'src/types/recipe'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    cover: {
      width: 150,
      height: 150,
    },
    content: {
      margin: theme.spacing(1),
    },
    inline: {
      display: 'inline',
    },
  }),
)

export type RecipePagePropType = {
  recipe: Recipe
}
export const RecipePage: React.VFC<RecipePagePropType> = ({ recipe }) => {
  const classes = useStyles()
  const router = useRouter()
  const [keyword, setKeyword] = React.useState<string>('')

  return (
    //   TODO: ここのデザイン
    <div>
      <Header headerTitle="レシピ検索サイト" />

      {recipe && (
        <main>
          <Card className={classes.root}>
            {recipe.image_url && (
              <img
                //   className={classes.cover}
                src={recipe.image_url}
                alt="レシピ画像"
                width="100%"
              />
            )}

            {/* <CardMedia
              className={classes.cover}
              image={`${recipe.image_url}`}
            /> */}
            <CardContent className={classes.content}>
              <Typography variant="h5">{recipe.title}</Typography>
              <Typography variant="body1">{recipe.author.user_name}</Typography>

              {/* TODO: 日付表示を整える */}
              <Typography variant="body1">{recipe.published_at}</Typography>
              <Typography variant="body1">{recipe.description}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="材料"></CardHeader>
            <CardContent>
              <List>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i}>
                    <ListItem alignItems="flex-start" key={i}>
                      {/* TODO: エラー処理を作る */}
                      <Grid container justify="space-between">
                        {ing.name}
                      </Grid>
                      <Grid container justify="space-between">
                        {ing.quantity}
                      </Grid>
                    </ListItem>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="手順"></CardHeader>
            <CardContent>
              <List>
                {recipe.steps.map((step, i) => (
                  <div key={i}>
                    <ListItem alignItems="flex-start" key={i}>
                      {/* TODO: エラー処理を作る */}
                      <Grid container>
                        {i + 1}. {step}
                      </Grid>
                    </ListItem>
                    <Divider component="li" />
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </main>
      )}
    </div>
  )
}
