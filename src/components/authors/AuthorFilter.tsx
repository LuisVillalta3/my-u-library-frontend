import React from 'react'
import { Grid, TextField } from '@mui/material'

type Props = {
  handleChangeFirstName: (event: React.ChangeEvent<HTMLInputElement>) => void
  firstName: string
  handleChangeLastName: (event: React.ChangeEvent<HTMLInputElement>) => void
  lastName: string
}

export const AuthorFilter: React.FC<Props> = ({
  firstName,
  handleChangeFirstName,
  handleChangeLastName,
  lastName,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by title"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeFirstName}
          value={firstName}
        />
      </Grid>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by author name"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeLastName}
          value={lastName}
        />
      </Grid>
    </Grid>
  )
}
