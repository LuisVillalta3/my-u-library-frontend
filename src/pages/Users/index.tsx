import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Column } from '@types'
import { Loading } from '@components/Loading'
import { Error } from '@components/Error'
import { TableHead } from '@components/DataTable/TableHead'
import { Pagination } from '@components/DataTable/Pagination'
import { UserFilter } from '@components/user/UserFilter'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllUsers } from '@api/users/getAll'
import { ViewButton } from '@components/Button/ViewButton'
import axios, { AxiosRequestConfig } from 'axios'
import { USER_ENDPOINT } from '@constants'

const items: BreadcrumbItem[] = [{ title: 'Users', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'First Name' },
  { id: 'lastname', label: 'LastName' },
  { id: 'email', label: 'Email' },
  { id: 'Role', label: 'Role' },
  { id: 'options', label: 'Options' },
]

export const Users = () => {
  const {
    data,
    error,
    handleChangePage,
    setParams,
    handleChangeRowsPerPage,
    isLoading,
    page,
    handleChangeFirstName,
    first_name,
    handleChangeLastName,
    last_name,
    email,
    handleChangeEmail,
    rowsPerPage,
    setError,
    setIsLoading,
  } = getAllUsers()

  if (error) return <Error items={items} error={error} />
  const res = data || { total: 0, rows: [] }
  const { rows, total } = res
  const [deleteId, setDeleteId] = React.useState<number | string | null>(null)

  React.useEffect(() => {
    const deleteUser = async () => {
      if (!deleteId) return null
      const config: AxiosRequestConfig = {
        url: `${USER_ENDPOINT}/${deleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      try {
        await axios(config)
        setParams({ page: 1, rowsPerPage, first_name, last_name, email })
      } catch (error) {
        setError(error)
      } finally {
        setDeleteId(null)
        setIsLoading(false)
      }
    }
    deleteUser()
  }, [deleteId])

  return (
    <MainLayout>
      <Heading title="Users" items={items} />
      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Button
            href="/users/create"
            variant="contained"
            sx={{ m: 3 }}
            endIcon={<AddCircleIcon />}
          >
            Add new User
          </Button>
          <UserFilter
            first_name={first_name}
            last_name={last_name}
            email={email}
            handleChangeFirstName={handleChangeFirstName}
            handleChangeLastName={handleChangeLastName}
            handleChangeEmail={handleChangeEmail}
          />
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
                        <TableCell>{row?.role?.name}</TableCell>
                        <TableCell>
                          <ViewButton href={`/users/${row.id}`} />
                        </TableCell>
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
