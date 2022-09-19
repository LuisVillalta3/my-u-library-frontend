import React from 'react'
import { useDrawer } from '@hooks/useDrawer'
import { Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

type Props = {
  open: boolean
  handleDrawerOpen: () => void
}

export const AppBar: React.FC<Props> = ({ open, handleDrawerOpen }) => {
  const { AppBar } = useDrawer()

  const handleTokenRemove = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
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
        <Typography variant="h6" noWrap component="div" sx={{ width: '80%' }}>
          My U Library
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleTokenRemove}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <PowerSettingsNewIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
