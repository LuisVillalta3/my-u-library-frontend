import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, CssBaseline } from '@mui/material'
import { useDrawer } from '@hooks/useDrawer'
import { MenuList } from '@components/MainLayout/MenuList'
import { LayoutDrawer } from '@components/MainLayout/LayoutDrawer'
import { AppBar } from '@components/MainLayout/AppBar'

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { DrawerHeader, open, handleDrawerClose, handleDrawerOpen } =
    useDrawer()
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <LayoutDrawer
        open={open}
        theme={theme}
        handleDrawerClose={handleDrawerClose}
      >
        <MenuList open={open} />
      </LayoutDrawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {!!children && children}
      </Box>
    </Box>
  )
}
