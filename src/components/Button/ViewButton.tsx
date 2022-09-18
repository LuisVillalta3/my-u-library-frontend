import React from 'react'
import { IconButton } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

type Props = {
  href: string
}

export const ViewButton: React.FC<Props> = ({ href }) => {
  return (
    <IconButton href={href} aria-label="delete" color="success">
      <RemoveRedEyeIcon />
    </IconButton>
  )
}
