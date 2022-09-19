/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { BookForm } from '@components/books/BookForm'
import { Book } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { BOOK_ENDPOINT } from '@constants'
import { useNavigate } from 'react-router-dom'

const items: BreadcrumbItem[] = [
  { title: 'Books', href: '/books' },
  { title: 'Create', current: true },
]

const config: AxiosRequestConfig = {
  url: BOOK_ENDPOINT,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

export const CreateBook = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const [book, setBook] = React.useState<Book>({
    id: 0,
    description: '',
    author_id: '',
    genre_id: '',
    available: true,
    in_stock: 0,
    published_date: '',
    title: '',
  })

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isValid) return
    config.data = { book }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const newAuthor = res.data as Book
        navigate(`/books/${newAuthor.id}`)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [book])

  return (
    <MainLayout>
      <Heading title="Books" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                Create book
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              <BookForm
                book={book}
                setBook={setBook}
                setIsValid={setIsValid}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  )
}
