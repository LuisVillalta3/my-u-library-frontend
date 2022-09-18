/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// import useFetch from 'react-fetch-hook'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from './Heading'
import { Box, Typography } from '@mui/material'

type Props = {
  items: BreadcrumbItem[]
  error?: any
}

export const Error: React.FC<Props> = ({ items, error }) => {
  console.log(error)

  return (
    <MainLayout>
      <Heading title="Users" items={items} />

      <Box sx={{ p: 6 }}>
        <div style={{ height: 400, width: '100%' }}>
          <Typography variant="h3" gutterBottom>
            {error?.message || 'Something went wrong'}
          </Typography>
          {error?.response?.data?.errors?.map((e: any) => (
            <Typography variant="h5" color="red" gutterBottom key={e.detail}>
              {e?.message || 'Bad request'}
            </Typography>
          ))}
        </div>
      </Box>
    </MainLayout>
  )
}
