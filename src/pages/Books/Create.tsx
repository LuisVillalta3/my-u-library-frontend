import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { BreadcrumbItem, Heading } from '../../components/Heading'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { BookForm } from '../../components/books/BookForm'

const items: BreadcrumbItem[] = [{ title: 'Books', href: '/books' }, { title: 'Create', current: true }]

export const CreateBook = () => {
  return (
    <MainLayout>
      <Heading title='Books' items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{p: 3}} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>Create book</Typography>
              <BookForm />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  )
}
