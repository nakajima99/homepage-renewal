import { AppBar, Box, Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { css } from '@emotion/react'

const listStyle = css`
  display: flex;
`

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar >
        <Box>
          <Logo />
        </Box>
        <Menu />
      </Toolbar>
    </AppBar>
  )
}

const Logo = () => {
  return (
    <Typography>interbond株式会社</Typography>
  )
}

const Menu = () => {
  const menu = [
    'ホーム',
    '事業内容',
    '会社情報',
    '採用情報',
    'お問合せ',
  ]
  return (
    <List
      css={listStyle}
    >
      {menu.map(ele => (
        <ListItem>
          <ListItemButton>
            <ListItemText>{ele}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem>
        <ListItemButton>
          <ListItemIcon><Search /></ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  )
}