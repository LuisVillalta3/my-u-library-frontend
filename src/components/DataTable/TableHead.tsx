import React from 'react'
import MuiTableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { Column } from '@types'

type Props = {
  columns: Column[]
  children?: React.ReactNode
}

export const TableHead: React.FC<Props> = ({ columns, children }) => {
  return (
    <MuiTableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
        {!!children && children}
      </TableRow>
    </MuiTableHead>
  )
}
