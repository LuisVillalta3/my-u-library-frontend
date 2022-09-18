import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { BreadcrumbItem, Heading } from '../../components/Heading'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { Column, Book } from '../../types'
import { getAllBooks, FetchResulBooks } from '../../api/books/getAll'
import { Loading } from '../../components/Loading'
import { Error } from '../../components/Error'
import { TableHead } from '../../components/DataTable/TableHead'
import { Pagination } from '../../components/DataTable/Pagination'
import { BookFilter } from '../../components/books/bookFilter'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const items: BreadcrumbItem[] = [{ title: 'Books', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'author', label: 'Author' },
  { id: 'genre', label: 'Genre' },
  { id: 'published_date', label: 'Published Date' },
  { id: 'in_stock', label: 'In Stock' },
  { id: 'available', label: 'Available' }
];

export const Books = () => {
  const {
    data, error, handleChangePage, handleChangeRowsPerPage, isLoading, page, rowsPerPage,
  } = getAllBooks()

  if (error) return <Error items={items} error={error} />

  const res = data as FetchResulBooks || { total: 0, rows: [] }
  const { rows, total } = res;

  return (
    <MainLayout>
      <Heading title='Books' items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Button href='/books/create' variant="contained" sx={{ m: 3 }} endIcon={<AddCircleIcon />}>
            Add new book
          </Button>
          
          {/* <BookFilter handleChangeName={handleChangeName} obj={name} /> */}
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
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.description ? row.description : '-'}</TableCell>
                        <TableCell>{row.author_id}</TableCell>
                        <TableCell>{row.genre_id}</TableCell>
                        <TableCell>{row.published_date}</TableCell>
                        <TableCell>{row.in_stock}</TableCell>
                        <TableCell>{row.available}</TableCell>
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
