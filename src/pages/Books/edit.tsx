/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { BookForm } from '@components/books/BookForm'
import { Book, DecodedToken, User } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { BOOK_ENDPOINT } from '@constants'
import { useParams, useNavigate } from 'react-router-dom'
import { useBook } from '@hooks/useBook'
import { Loading } from '@components/Loading'
import { decodeToken } from 'react-jwt'

const token = localStorage.getItem('token')

export const EditBook = () => {
  if (!token) return null

  const tokenDecoded = decodeToken(token) as DecodedToken
  const navigate = useNavigate()
  const currentUser = JSON.parse(tokenDecoded?.user) as User
  if (!tokenDecoded || currentUser?.role?.code != 'librarian') {
    React.useEffect(() => {
      navigate('/login')
    }, [])
    return null
  }

  const { id } = useParams()
  if (!id) return null

  const items: BreadcrumbItem[] = [
    { title: 'Books', href: '/books' },
    { title: id, href: `/books/${id}` },
    { title: 'Edit', current: true },
  ]

  const config: AxiosRequestConfig = {
    url: `${BOOK_ENDPOINT}/${id}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const { book, setBook } = useBook(id)

  React.useEffect(() => {
    if (!isValid) return
    config.data = { book }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const Bewbook = res.data as Book
        navigate(`/books/${Bewbook.id}`)
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
                Edit Book
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              {book.id == 0 && <Loading />}
              {book.id != 0 && (
                <BookForm
                  book={book}
                  setBook={setBook}
                  setIsValid={setIsValid}
                  isLoading={isLoading}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  )
}
