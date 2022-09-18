/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { AuthorForm } from '@components/authors/AuthorForm'
import { Author } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { AUTHOR_ENDPOINT } from '@constants'
import { useNavigate } from 'react-router-dom'

const items: BreadcrumbItem[] = [
  { title: 'Authors', href: '/authors' },
  { title: 'Create', current: true },
]

const config: AxiosRequestConfig = {
  url: AUTHOR_ENDPOINT,
  method: 'POST',
}

export const CreateAuthor = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [isValid, setIsValid] = React.useState(false)
  const [author, setAuthor] = React.useState<Author>({
    id: 0,
    firstName: '',
    lastName: '',
    nacionality: '',
    birthday: '',
  })

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
                Create author
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              <AuthorForm
                author={author}
                setAuthor={setAuthor}
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
