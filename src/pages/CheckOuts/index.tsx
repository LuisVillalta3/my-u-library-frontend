import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import { Column, DecodedToken, CheckOutRequest, User } from '@types'
import { Loading } from '@components/Loading'
import { Error } from '@components/Error'
import { TableHead } from '@components/DataTable/TableHead'
import { Pagination } from '@components/DataTable/Pagination'
import { getAllCheckOutRequests } from '@api/checkOutRequests/getAll'
import axios, { AxiosRequestConfig } from 'axios'
import { CHECKOUT_ENDPOINT } from '@constants'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'

const items: BreadcrumbItem[] = [{ title: 'Check outs', current: true }]

const columns: Column[] = [
  { id: 'id', label: 'ID' },
  { id: 'book', label: 'Book' },
  { id: 'Status', label: 'Status' },
  { id: 'User', label: 'User' },
  { id: 'Created_at', label: 'Created at' },
  { id: 'options', label: 'Options' },
]

const token = localStorage.getItem('token')

export const CheckOutRequests = () => {
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
    rowsPerPage,
    setError,
    setIsLoading,
  } = getAllCheckOutRequests(isLibrarian ? '' : currentUser?.id)

  if (error) return <Error items={items} error={error} />
  const res = data || { total: 0, rows: [] }
  const { rows, total } = res
  const [returnedId, setReturnedId] = React.useState<number | string | null>(
    null
  )

  const handleReturn = async (id: number | string) => {
    setReturnedId(id)
  }

  React.useEffect(() => {
    const deleteCheckOutRequest = async () => {
      if (!returnedId) return null
      const config: AxiosRequestConfig = {
        url: `${CHECKOUT_ENDPOINT}/${returnedId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      try {
        await axios(config)
        setParams({ page: 1, rowsPerPage })
      } catch (error) {
        setError(error)
      } finally {
        setReturnedId(null)
        setIsLoading(false)
      }
    }
    deleteCheckOutRequest()
  }, [returnedId])

  return (
    <MainLayout>
      <Heading title="Check Out Requests" items={items} />
      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          {isLoading && <Loading />}
          {!isLoading && (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead columns={columns} />
                  <TableBody>
                    {rows.map((row: CheckOutRequest) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row?.book?.title}</TableCell>
                        <TableCell>
                          <Chip
                            label={row?.request_status?.name}
                            color={
                              row?.request_status?.code == 'returned'
                                ? 'success'
                                : 'error'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {row?.user?.first_name} {row?.user?.last_name}
                        </TableCell>
                        <TableCell>{row?.created_at}</TableCell>
                        <TableCell>
                          {isLibrarian &&
                            row?.request_status?.code != 'returned' && (
                              <Button
                                variant="contained"
                                onClick={() => handleReturn(row.id)}
                              >
                                Set as Returned
                              </Button>
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
