/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { GenreForm } from '@components/genres/GenreForm'
import { DecodedToken, Genre, User } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { GENRE_ENDPOINT } from '@constants'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'

const items: BreadcrumbItem[] = [
  { title: 'Genres', href: '/genres' },
  { title: 'Create', current: true },
]

const config: AxiosRequestConfig = {
  url: GENRE_ENDPOINT,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

const token = localStorage.getItem('token')

export const CreateGenre = () => {
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

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const [genre, setGenre] = React.useState<Genre>({
    id: 0,
    name: '',
    description: '',
  })

  React.useEffect(() => {
    if (!isValid) return
    config.data = { genre }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const newAuthor = res.data as Genre
        navigate(`/genres/${newAuthor.id}`)
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
      <Heading title="Genres" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                Create Genre
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              <GenreForm
                genre={genre}
                setGenre={setGenre}
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
