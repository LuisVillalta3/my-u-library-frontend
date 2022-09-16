import React from 'react'
import { useDrawer } from '../../hooks/useDrawer'
import {
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  open: boolean
}

export const AppBar: React.FC<Props> = ({ open }) => {
  const { AppBar, handleDrawerOpen} = useDrawer()

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
        <Typography variant="h6" noWrap component="div">
          My U Library
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
