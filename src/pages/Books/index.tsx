import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import {
  Box,
  Button,
  Chip,
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
import { BookFilter } from '@components/books/bookFilter'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllBooks } from '@api/books/getAll'
import { EditButton } from '@components/Button/EditButton'
import { ViewButton } from '@components/Button/ViewButton'
import axios, { AxiosRequestConfig } from 'axios'
import { BOOK_ENDPOINT } from '@constants'
import DeleteIcon from '@mui/icons-material/Delete'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

const items: BreadcrumbItem[] = [{ title: 'Books', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'author', label: 'Author' },
  { id: 'genre', label: 'Genre' },
  { id: 'published_date', label: 'Published Date' },
  { id: 'in_stock', label: 'In Stock' },
  { id: 'available', label: 'Available' },
  { id: 'options', label: 'Options' },
]

const token = localStorage.getItem('token')

export const Books = () => {
  if (!token) return null

  const tokenDecoded = decodeToken(token) as DecodedToken
  const navigate = useNavigate()
  const currentUser = JSON.parse(tokenDecoded?.user) as User

  if (!tokenDecoded) {
    React.useEffect(() => {
      navigate('/login')
    }, [])
    return null
  }
  const isLibrarian = currentUser?.role?.code == 'librarian'

  const {
    data,
    error,
    handleChangePage,
    setParams,
    handleChangeRowsPerPage,
    isLoading,
    page,
    title,
    handleChangeTitle,
    rowsPerPage,
    setError,
    author_id,
    handleChangeAuthor,
    genre_id,
    handleChangeGenre,
    setIsLoading,
  } = getAllBooks()

  if (error) return <Error items={items} error={error} />
  const res = data || { total: 0, rows: [] }
  const { rows, total } = res
  const [deleteId, setDeleteId] = React.useState<number | string | null>(null)

  React.useEffect(() => {
    const deletebook = async () => {
      if (!deleteId) return null
      const config: AxiosRequestConfig = {
        url: `${BOOK_ENDPOINT}/${deleteId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      try {
        await axios(config)
        setParams({ page: 1, rowsPerPage, title, author_id, genre_id })
      } catch (error) {
        setError(error)
      } finally {
        setDeleteId(null)
        setIsLoading(false)
      }
    }
    deletebook()
  }, [deleteId])

  return (
    <MainLayout>
      <Heading title="Books" items={items} />
      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          {isLibrarian && (
            <Button
              href="/books/create"
              variant="contained"
              sx={{ m: 3 }}
              endIcon={<AddCircleIcon />}
            >
              Add new book
            </Button>
          )}
          <BookFilter
            title={title}
            handleChangeTitle={handleChangeTitle}
            author_id={author_id}
            handleChangeAuthor={handleChangeAuthor}
            genre_id={genre_id}
            handleChangeGenre={handleChangeGenre}
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
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          {[
                            row?.author?.first_name,
                            row?.author?.last_name,
                          ].join(' ')}
                        </TableCell>
                        <TableCell>{row?.genre?.name}</TableCell>
                        <TableCell>{row.published_date}</TableCell>
                        <TableCell>{row.in_stock}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.available ? 'Yes' : 'No'}
                            color={row.available ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell>
                          <ViewButton href={`/books/${row.id}`} />
                          {isLibrarian && (
                            <>
                              <EditButton href={`/books/${row.id}/edit`} />
                              <IconButton
                                aria-label="delete"
                                color="error"
                                onClick={() => setDeleteId(row.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
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
