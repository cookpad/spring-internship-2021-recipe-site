import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { SearchBar } from '../molecules/searchBar'

export type Header = {
  headerTitle: string
}

// export type HeaderPropType = {
//   searchWord: string
// }
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: 'flex',
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    input: {
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
)

export const Header: React.VFC<Header> = ({ headerTitle }) => {
  const classes = useStyles()

  return (
    <Toolbar>
      <Typography className={classes.title} variant="h5" noWrap>
        {headerTitle}
      </Typography>

      <SearchBar
        classNameInput={classes.input}
        classNameButton={classes.button}
      />

      {/* TODO: 検索機能をヘッダーに追加 */}
      {/* <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div> */}
    </Toolbar>
  )
}
