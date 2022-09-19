import React from 'react'
import { Grid, TextField } from '@mui/material'

type Props = {
  handleChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void
  title: string
}

export const BookFilter: React.FC<Props> = ({ handleChangeTitle, title }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}
      justifyContent="flex-end"
    >
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by title"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeTitle}
          value={title}
        />
      </Grid>
      {/* <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by author name"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeName}
          value={name}
        />
      </Grid>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by genre"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeName}
          value={name}
        />
      </Grid> */}
    </Grid>
  )
}
