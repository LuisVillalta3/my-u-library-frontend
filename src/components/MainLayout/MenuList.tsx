import { List } from '@mui/material'
import React from 'react'
import { MenuButton } from './MenuButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import GroupIcon from '@mui/icons-material/Group'
import CategoryIcon from '@mui/icons-material/Category'
import { useJwt } from 'react-jwt'
import { User } from '@types'

type props = {
  open: boolean
}

type DecodedTokenType = {
  exp: number
  user: string
}

export const MenuList: React.FC<props> = ({ open }) => {
  const token = localStorage.getItem('token')
  if (!token) return null

  const { decodedToken } = useJwt(token)
  const decoded = decodedToken as DecodedTokenType

  if (!decoded) return null

  const user = JSON.parse(decoded.user) as User

  return (
    <List>
      <MenuButton
        open={open}
        href="/"
        text="Dashboard"
        icon={<DashboardIcon />}
      />
      {user?.role?.code == 'librarian' && (
        <>
          <MenuButton
            open={open}
            href="/users"
            text="Users"
            icon={<PersonIcon />}
          />
          <MenuButton
            open={open}
            href="/authors"
            text="Authors"
            icon={<GroupIcon />}
          />
          <MenuButton
            open={open}
            href="/genres"
            text="Genres"
            icon={<CategoryIcon />}
          />
          <MenuButton
            open={open}
            href="/books"
            text="Books"
            icon={<MenuBookIcon />}
          />
        </>
      )}
      <MenuButton
        open={open}
        href="/"
        text="Dashboard"
        icon={<LocalLibraryIcon />}
      />
    </List>
  )
  // GIOWSHZYJAQUPFTQ password ejemplo
}
