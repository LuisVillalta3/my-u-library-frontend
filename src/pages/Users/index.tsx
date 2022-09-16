import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { BreadcrumbItem, Heading } from '../../components/Heading'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const items: BreadcrumbItem[] = [{ title: 'Users', current: true }]

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
];

export const Users = () => {
  return (
    <MainLayout>
      <Heading title='Users' items={items} />

      <Box sx={{ p: 6 }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Box>
    </MainLayout>
  )
}
