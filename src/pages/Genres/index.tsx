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
import { Column } from '@types'
import { Loading } from '@components/Loading'
import { Error } from '@components/Error'
import { TableHead } from '@components/DataTable/TableHead'
import { Pagination } from '@components/DataTable/Pagination'
import { GenreFilter } from '@components/genres/GenreFilter'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getAllGenres } from '@api/genres/getAll'
import { EditButton } from '@components/Button/EditButton'
import { ViewButton } from '@components/Button/ViewButton'
import axios, { AxiosRequestConfig } from 'axios'
import { GENRE_ENDPOINT } from '@constants'
import DeleteIcon from '@mui/icons-material/Delete'

const items: BreadcrumbItem[] = [{ title: 'Genres', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'options', label: 'Options' },
]

export const Genres = () => {
  const {
    data,
    error,
    handleChangePage,
    setParams,
    handleChangeRowsPerPage,
    isLoading,
    page,
    handleChangeName,
    name,
    rowsPerPage,
    setError,
    setIsLoading,
  } = getAllGenres()

  if (error) return <Error items={items} error={error} />
  const res = data || { total: 0, rows: [] }
  const { rows, total } = res
  const [deleteId, setDeleteId] = React.useState<number | string | null>(null)

  React.useEffect(() => {
    const deleteGenre = async () => {
      if (!deleteId) return null
      const config: AxiosRequestConfig = {
        url: `${GENRE_ENDPOINT}/${deleteId}`,
        method: 'DELETE',
      }
      try {
        await axios(config)
        setParams({ page: 1, rowsPerPage, name })
      } catch (error) {
        setError(error)
      } finally {
        setDeleteId(null)
        setIsLoading(false)
      }
    }
    deleteGenre()
  }, [deleteId])

  return (
    <MainLayout>
      <Heading title="Genres" items={items} />
      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Button
            href="/genres/create"
            variant="contained"
            sx={{ m: 3 }}
            endIcon={<AddCircleIcon />}
          >
            Add new Genre
          </Button>
          <GenreFilter name={name} handleChangeName={handleChangeName} />
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
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>
                          <ViewButton href={`/genres/${row.id}`} />
                          <EditButton href={`/genres/${row.id}/edit`} />
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
