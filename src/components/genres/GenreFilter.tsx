import React from 'react'
import { Grid, TextField } from '@mui/material'

type Props = {
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const GenreFilter: React.FC<Props> = ({ name, handleChangeName }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by name"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeName}
          value={name}
        />
      </Grid>
    </Grid>
  )
}
