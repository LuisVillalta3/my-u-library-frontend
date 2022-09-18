/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { GenreForm } from '@components/genres/GenreForm'
import { Genre } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { GENRE_ENDPOINT } from '@constants'
import { useParams, useNavigate } from 'react-router-dom'
import { useGenre } from '@hooks/useGenre'
import { Loading } from '@components/Loading'

export const EditGenre = () => {
  const { id } = useParams()
  if (!id) return null

  const items: BreadcrumbItem[] = [
    { title: 'genres', href: '/genres' },
    { title: id, href: `/genres/${id}` },
    { title: 'Edit', current: true },
  ]

  const config: AxiosRequestConfig = {
    url: `${GENRE_ENDPOINT}/${id}`,
    method: 'PUT',
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const { genre, setGenre } = useGenre(id)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isValid) return
    config.data = { genre }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const newgenre = res.data as Genre
        navigate(`/genres/${newgenre.id}`)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [genre])

  return (
    <MainLayout>
      <Heading title="genres" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                Edit genre
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              {genre.id == 0 && <Loading />}
              {genre.id != 0 && (
                <GenreForm
                  genre={genre}
                  setGenre={setGenre}
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
