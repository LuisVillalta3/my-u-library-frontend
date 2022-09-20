/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Alert, Box, Grid, Paper, Typography } from '@mui/material'
import { UserForm } from '@components/user/UserForm'
import { DecodedToken, User } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { USER_ENDPOINT } from '@constants'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'

const items: BreadcrumbItem[] = [
  { title: 'users', href: '/users' },
  { title: 'Create', current: true },
]

const config: AxiosRequestConfig = {
  url: USER_ENDPOINT,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

const token = localStorage.getItem('token')

export const CreateUser = () => {
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
  const [user, setUser] = React.useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    role_id: '',
  })

  React.useEffect(() => {
    if (!isValid) return
    config.data = { user }
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await axios(config)
        const newAuthor = res.data as User
        navigate(`/users/${newAuthor.id}`)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  return (
    <MainLayout>
      <Heading title="Users" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom>
                Create user
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error.response?.data?.response?.data?.errors?.[0]?.message ||
                    error.response?.data?.message ||
                    error.message ||
                    'An error has occurred'}
                </Alert>
              )}
              <UserForm
                user={user}
                setUser={setUser}
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
