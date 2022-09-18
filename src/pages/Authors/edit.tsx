/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { AuthorForm } from '@components/authors/AuthorForm'
import { Author } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { AUTHOR_ENDPOINT } from '@constants'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthor } from '@hooks/useAuthor'
import { Loading } from '@components/Loading'

export const EditAuthor = () => {
  const { id } = useParams()
  if (!id) return null

  const items: BreadcrumbItem[] = [
    { title: 'Authors', href: '/authors' },
    { title: id, href: `/authors/${id}` },
    { title: 'Edit', current: true },
  ]

  const config: AxiosRequestConfig = {
    url: `${AUTHOR_ENDPOINT}/${id}`,
    method: 'PUT',
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const { author, setAuthor } = useAuthor(id)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isValid) return
    config.data = { author }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const newAuthor = res.data as Author
        navigate(`/authors/${newAuthor.id}`)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [author])

  return (
    <MainLayout>
      <Heading title="Authors" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                Edit author
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              {author.id == 0 && <Loading />}
              {author.id != 0 && (
                <AuthorForm
                  author={author}
                  setAuthor={setAuthor}
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
