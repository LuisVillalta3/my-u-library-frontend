import { TablePagination } from '@mui/material'
import React from 'react'

type Props = {
  page: number
  rowsPerPage: number
  count: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Pagination: React.FC<Props> = ({
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  rowsPerPage,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 100]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
