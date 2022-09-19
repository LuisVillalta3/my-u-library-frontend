/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGenre } from '@hooks/useGenre'
import { Error } from '@components/Error'
import { Loading } from '@components/Loading'
import axios, { AxiosRequestConfig } from 'axios'
import { GENRE_ENDPOINT } from '@constants'
const items: BreadcrumbItem[] = [
  { title: 'Authors', href: '/genres' },
  { title: 'Show', current: true },
]

export const ShowGenre = () => {
  const { id } = useParams()
  if (!id) return null

  const { error, isLoading, genre, setError, setIsLoading } = useGenre(id)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const navigate = useNavigate()

  const config: AxiosRequestConfig = {
    url: `${GENRE_ENDPOINT}/${id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  React.useEffect(() => {
    if (!isDeleting) return
    const deleteGenre = async () => {
      try {
        await axios(config)
        navigate('/genres')
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    deleteGenre()
  }, [isDeleting])

  const handleDeleteItem = () => {
    setIsDeleting(true)
  }

  if (error) return <Error items={items} error={error} />

  return (
    <MainLayout>
      <Heading title="Genres" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Show Genre
              </Typography>
              {isLoading && <Loading />}
              {!isLoading && (
                <>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Name:</b> {genre.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Description:</b> {genre.description}
                  </Typography>
                  <Button variant="outlined" href="/genres" sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    href={`/genres/${genre.id}/edit`}
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
