import React from 'react'
import { Box, CssBaseline } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDrawer } from '@hooks/useDrawer'
import { MenuList } from '@components/MainLayout/MenuList'
import { LayoutDrawer } from '@components/MainLayout/LayoutDrawer'
import { AppBar } from '@components/MainLayout/AppBar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { DrawerHeader, open, handleDrawerClose, handleDrawerOpen } =
    useDrawer()
  const theme = useTheme()

  const navigate = useNavigate()

  const { checkAuth } = useAuth()
  const redirectToLogin = !checkAuth()
  React.useEffect(() => {
    if (redirectToLogin) navigate('/login')
  }, [])

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
