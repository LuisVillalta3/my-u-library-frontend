import React from 'react'
import { Grid, TextField } from '@mui/material'

type Props = {
  handleChangeFirstName: (event: React.ChangeEvent<HTMLInputElement>) => void
  first_name: string
  handleChangeLastName: (event: React.ChangeEvent<HTMLInputElement>) => void
  last_name: string
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void
  email: string
}

export const UserFilter: React.FC<Props> = ({
  first_name,
  handleChangeFirstName,
  handleChangeLastName,
  last_name,
  handleChangeEmail,
  email,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by name"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeFirstName}
          value={first_name}
        />
      </Grid>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by last name"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeLastName}
          value={last_name}
        />
      </Grid>
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by email"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeEmail}
          value={email}
        />
      </Grid>
    </Grid>
  )
}
