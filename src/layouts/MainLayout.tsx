import React from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useDrawer } from '../hooks/useDrawer'
import { MenuList } from '../components/MainLayout/MenuList'
import { LayoutDrawer } from '../components/MainLayout/LayoutDrawer'

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { AppBar, DrawerHeader, handleDrawerOpen, open, handleDrawerClose } = useDrawer()
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            My U Library
          </Typography>
        </Toolbar>
      </AppBar>
      <LayoutDrawer open={open} theme={theme} handleDrawerClose={handleDrawerClose}>
        <MenuList open={open} />
      </LayoutDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {!!children && children}
      </Box>
    </Box>
  )
}
