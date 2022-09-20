import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Column, DecodedToken, User } from '@types'
import { Loading } from '@components/Loading'
import { Error } from '@components/Error'
import { TableHead } from '@components/DataTable/TableHead'
import { Pagination } from '@components/DataTable/Pagination'
import { AuthorFilter } from '@components/authors/AuthorFilter'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllAuthors } from '@api/authors/getAll'
import { EditButton } from '@components/Button/EditButton'
import { ViewButton } from '@components/Button/ViewButton'
import axios, { AxiosRequestConfig } from 'axios'
import { AUTHOR_ENDPOINT } from '@constants'
import DeleteIcon from '@mui/icons-material/Delete'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

const items: BreadcrumbItem[] = [{ title: 'Authors', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'firstName', label: 'First name' },
  { id: 'lastName', label: 'Last name' },
  { id: 'nacionality', label: 'Nacionality' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'options', label: 'Options' },
]

const token = localStorage.getItem('token')

export const Authors = () => {
  if (!token) return null

  const tokenDecoded = decodeToken(token) as DecodedToken
  const navigate = useNavigate()
  const currentUser = JSON.parse(tokenDecoded?.user) as User
  if (!tokenDecoded || currentUser?.role?.code != 'librarian') {
    React.useEffect(() => {
      navigate('/login')
    }, [])
    return null
  }

  const {
    data,
    error,
    handleChangePage,
    setParams,
    handleChangeRowsPerPage,
    isLoading,
    page,
    handleChangeFirstName,
    handleChangeLastName,
    first_name,
    last_name,
    rowsPerPage,
    setError,
    setIsLoading,
  } = getAllAuthors()

  if (error) return <Error items={items} error={error} />
  const res = data || { total: 0, rows: [] }
  const { rows, total } = res
  const [deleteId, setDeleteId] = React.useState<number | string | null>(null)

  React.useEffect(() => {
    const deleteAuthor = async () => {
      if (!deleteId) return null
      const config: AxiosRequestConfig = {
        url: `${AUTHOR_ENDPOINT}/${deleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      try {
        await axios(config)
        setParams({ page: 1, rowsPerPage, first_name, last_name })
      } catch (error) {
        setError(error)
      } finally {
        setDeleteId(null)
        setIsLoading(false)
      }
    }
    deleteAuthor()
  }, [deleteId])

  return (
    <MainLayout>
      <Heading title="Authors" items={items} />
      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Button
            href="/authors/create"
            variant="contained"
            sx={{ m: 3 }}
            endIcon={<AddCircleIcon />}
          >
            Add new author
          </Button>
          <AuthorFilter
            last_name={last_name}
            handleChangeLastName={handleChangeLastName}
            first_name={first_name}
            handleChangeFirstName={handleChangeFirstName}
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
                        <TableCell>{row.nacionality}</TableCell>
                        <TableCell>{row.birthday}</TableCell>
                        <TableCell>
                          <ViewButton href={`/authors/${row.id}`} />
                          <EditButton href={`/authors/${row.id}/edit`} />
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => setDeleteId(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
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
