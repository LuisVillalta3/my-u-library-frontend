import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { BreadcrumbItem, Heading } from '../../components/Heading'
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { Column, User } from '../../types'
import useFetch from 'react-fetch-hook'
import { Loading } from '../../components/Loading'
import { GET_USERS_ENDPOINT } from '../../constants'
import { Error } from '../../components/Error'
import { TableHead } from '../../components/DataTable/TableHead'
import { Pagination } from '../../components/DataTable/Pagination'
import TextField from '@mui/material/TextField';

const items: BreadcrumbItem[] = [{ title: 'Users', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'first_name', label: 'First name' },
  { id: 'last_name', label: 'Last name' },
  { id: 'email', label: 'Email' },
  { id: 'role_id', label: 'Role' },
];

type UsersResult = {
  total: number;
  rows: User[]
}

export const Users = () => {
  const [page, setPage] = React.useState(1);
  const [name, setName] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isLoading, data, error } = useFetch(GET_USERS_ENDPOINT(page, rowsPerPage, name))

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setPage(1);
  }

  if (error) return <Error items={items} error={error} />

  const res = data as UsersResult || { total: 0, rows: [] }
  const { rows, total } = res;

  return (
    <MainLayout>
      <Heading title='Users' items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Grid container spacing={2} sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }} justifyContent='flex-end'>
            <Grid item xs={24} md={4}>
              <TextField
                id="name-filter"
                label="Buscar por nombre"
                fullWidth
                margin="dense"
                variant="outlined"
                onInput={handleChangeName}
                value={name}
              />
            </Grid>
          </Grid>

          {isLoading && <Loading />}

          {!isLoading && (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead columns={columns} />
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.first_name}</TableCell>
                        <TableCell>{row.last_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={total}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                page={page - 1}
                rowsPerPage={rowsPerPage}
              />
            </Paper>
          )}
        </Paper>
      </Box>
    </MainLayout>
  )
}
