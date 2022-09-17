import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export const DeleteButton = () => {
  return (
    <IconButton aria-label="delete" color='error'>
      <DeleteIcon />
    </IconButton>
  )
}
