import { Divider, IconButton, Theme } from '@mui/material'
import React from 'react'
import { useDrawer } from '@hooks/useDrawer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type Props = {
  children: React.ReactNode
  open: boolean
  theme: Theme
  handleDrawerClose: () => void
}

export const LayoutDrawer: React.FC<Props> = ({
  theme,
  children,
  open,
  handleDrawerClose,
}) => {
  const { Drawer, DrawerHeader } = useDrawer()

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </Drawer>
  )
}
