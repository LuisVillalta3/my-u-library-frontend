/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Box, Button, Chip, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useBook } from '@hooks/useBook'
import { Error } from '@components/Error'
import { Loading } from '@components/Loading'
import axios, { AxiosRequestConfig } from 'axios'
import { BOOK_ENDPOINT } from '@constants'
import { decodeToken } from 'react-jwt'
import { DecodedToken, User } from '@types'

const items: BreadcrumbItem[] = [
  { title: 'Books', href: '/books' },
  { title: 'Show', current: true },
]

const token = localStorage.getItem('token')

export const ShowBook = () => {
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

  const { id } = useParams()
  if (!id) return null

  const { error, isLoading, book, setError, setIsLoading } = useBook(id)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const config: AxiosRequestConfig = {
    url: `${BOOK_ENDPOINT}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  React.useEffect(() => {
    if (!isDeleting) return
    const deleteBook = async () => {
      try {
        await axios(config)
        navigate('/books')
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    deleteBook()
  }, [isDeleting])

  const handleDeleteItem = () => {
    setIsDeleting(true)
  }

  if (error) return <Error items={items} error={error} />

  return (
    <MainLayout>
      <Heading title="Books" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Show Book
              </Typography>
              {isLoading && <Loading />}
              {!isLoading && (
                <>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Title:</b> {book.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Description:</b> {book.description}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Author:</b>{' '}
                    {[book?.author?.first_name, book?.author?.last_name].join(
                      ' '
                    )}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Genre:</b> {book?.genre?.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Published date:</b> {book.published_date}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>In Stock:</b> {book.in_stock}
                  </Typography>
                  <div>
                    <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                      <b>Available:</b>
                    </Typography>
                    <Chip
                      label={book.available ? 'Yes' : 'No'}
                      color={book.available ? 'success' : 'error'}
                    />
                  </div>
                  <br />
                  <Button variant="outlined" href="/Books" sx={{ mr: 1 }}>
                    Back
                  </Button>
                  {isLibrarian && (
                    <>
                      <Button
                        variant="contained"
                        href={`/books/${book.id}/edit`}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteItem()}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  )
}
