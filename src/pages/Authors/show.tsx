/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthor } from '@hooks/useAuthor'
import { Error } from '@components/Error'
import { Loading } from '@components/Loading'
import axios, { AxiosRequestConfig } from 'axios'
import { AUTHOR_ENDPOINT } from '@constants'
import { DecodedToken, User } from '@types'
import { decodeToken } from 'react-jwt'
const items: BreadcrumbItem[] = [
  { title: 'Authors', href: '/authors' },
  { title: 'Show', current: true },
]

const token = localStorage.getItem('token')

export const ShowAuthor = () => {
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

  const { error, isLoading, author, setError, setIsLoading } = useAuthor(id)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const config: AxiosRequestConfig = {
    url: `${AUTHOR_ENDPOINT}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  React.useEffect(() => {
    if (!isDeleting) return
    const deleteAuthor = async () => {
      try {
        await axios(config)
        navigate('/authors')
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    deleteAuthor()
  }, [isDeleting])

  const handleDeleteItem = () => {
    setIsDeleting(true)
  }

  if (error) return <Error items={items} error={error} />

  return (
    <MainLayout>
      <Heading title="Authors" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Show author
              </Typography>
              {isLoading && <Loading />}
              {!isLoading && (
                <>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>First name:</b> {author.first_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Last name:</b> {author.last_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Nacionality:</b> {author.nacionality}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Birthday:</b> {author.birthday}
                  </Typography>
                  <Button variant="outlined" href="/authors" sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    href={`/authors/${author.id}/edit`}
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
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </MainLayout>
  )
}
