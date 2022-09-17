import React from 'react'
import useFetch from 'react-fetch-hook'
import { MainLayout } from '../layouts/MainLayout'
import { BreadcrumbItem, Heading } from './Heading'
import { Box, Typography } from '@mui/material'

type Props = {
  items: BreadcrumbItem[];
  error?: useFetch.UseFetchError;
}

export const Error: React.FC<Props> = ({items, error}) => {
  return (
    <MainLayout>
      <Heading title='Users' items={items} />

      <Box sx={{ p: 6 }}>
        <div style={{ height: 400, width: '100%' }}>
          <Typography variant="h3" gutterBottom>
            {error?.message || 'Something went wrong'}
          </Typography>
          <Typography variant="h5" gutterBottom color='red'>
            {error?.statusText || 'Bad request'}
          </Typography>
        </div>
      </Box>
    </MainLayout>
  )
}
