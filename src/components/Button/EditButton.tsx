import React from 'react'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  href: string;
}

export const EditButton: React.FC<Props> = ({ href }) => {
  return (
    <IconButton href={href} aria-label="delete" color='primary'>
      <EditIcon />
    </IconButton>
  )
}
