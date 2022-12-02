import { AppBar, Box, Toolbar, List, ListItem, ListItemText, Typography, Drawer } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { css } from '@emotion/react'
import { useLayout } from '../hooks'
import { useRouter } from 'next/router'
import { useState } from 'react'

const toolbarStyle = css`
  /* display: flex; */
  justify-content: space-between;
`

const logoStyle = css`
  width: 140px;
  cursor: pointer;
`

const listStyle = css`
  display: flex;
  justify-content: space-between;
`

const listItemStyle = css`
  padding: 8px;
`

const linkStyle = color => css`
  cursor: pointer;
  white-space: nowrap;
  color: ${color};
`

const menu = [
  { text: 'ホーム', path: '/' },
  { text: '事業内容', path: '/business-content' },
  { text: '会社情報', path: '/companyinfo' },
  { text: '採用情報', path: '/recruit' },
  { text: 'お問合せ', path: '/contact' }
]

export const Header = () => {
  const layout = useLayout()
  return (
    <AppBar position="sticky">
      <Toolbar css={toolbarStyle}>
        <Box css={logoStyle}>
          <Logo />
        </Box>
        {layout === 'pc' && <PCMenu />}
        {layout === 'sp' && <SPMenu />}
      </Toolbar>
    </AppBar>
  )
}

const Logo = () => {
  const router = useRouter()
  return (
    <Typography onClick={() => router.push('/')}>interbond株式会社</Typography>
  )
}

const PCMenu = () => {
  const router = useRouter()
  const pathname = router.pathname
  const color = path => path == pathname ? 'yellow' : 'inherit'
  return (
    <List
      css={listStyle}
    >
      {menu.map((ele, index) => (
        <ListItem css={listItemStyle} key={index}>
          <ListItemText css={linkStyle(color(ele.path))} onClick={() => router.push(ele.path)}>{ele.text}</ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

const SPMenu = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const onClickLink = (path) => () => {
    setOpen(false)
    router.push(path)
  }

  return (<>
    <Menu onClick={toggleDrawer(true)} />
    <Drawer
      open={open}
      anchor="right"
      onClose={toggleDrawer(false)}
    >
      <List>
        {menu.map((ele, index) => (
          <ListItem css={listItemStyle} key={index}>
            <ListItemText onClick={onClickLink(ele.path)}>{ele.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  </>)
}