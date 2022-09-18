import { List } from '@mui/material'
import React from 'react'
import { MenuButton } from './MenuButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GroupIcon from '@mui/icons-material/Group';

type props = {
  open: boolean
}

export const MenuList: React.FC<props> = ({ open }) => {
  return (
    <List>
      <MenuButton open={open} href="/" text="Dashboard" icon={<DashboardIcon />} />
      <MenuButton open={open} href="/users" text="Usuarios" icon={<PersonIcon />} />
      <MenuButton open={open} href="/authors" text="Dashboard" icon={<GroupIcon />} />
      <MenuButton open={open} href="/books" text="Dashboard" icon={<MenuBookIcon />} />
      <MenuButton open={open} href="/" text="Dashboard" icon={<LocalLibraryIcon />} />
    </List>
  )
}
