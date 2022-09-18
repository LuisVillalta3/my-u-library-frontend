import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Column, FetchResult } from '@types'
import { Loading } from '@components/Loading'
import { Error } from '@components/Error'
import { TableHead } from '@components/DataTable/TableHead'
import { Pagination } from '@components/DataTable/Pagination'
import TextField from '@mui/material/TextField'
import { getAllUsers } from '@api/users/getAll'

const items: BreadcrumbItem[] = [{ title: 'Users', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'first_name', label: 'First name' },
  { id: 'last_name', label: 'Last name' },
  { id: 'email', label: 'Email' },
  { id: 'role_id', label: 'Role' },
]

export const Users = () => {
  const {
    data,
    error,
    handleChangeName,
    handleChangePage,
    handleChangeRowsPerPage,
    isLoading,
    name,
    page,
    rowsPerPage,
  } = getAllUsers()

  if (error) return <Error items={items} error={error} />

  const res = (data as FetchResult) || { total: 0, rows: [] }
  const { rows, total } = res

  return (
    <MainLayout>
      <Heading title="Users" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Grid
            container
            spacing={2}
            sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}
            justifyContent="flex-end"
          >
            <Grid item xs={24} md={4}>
              <TextField
                id="name-filter"
                label="Search by name"
                fullWidth
                margin="dense"
                variant="outlined"
                onChange={handleChangeName}
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
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
