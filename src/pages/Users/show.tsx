/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { MainLayout } from '@layouts/MainLayout'
import { BreadcrumbItem, Heading } from '@components/Heading'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useUser } from '@hooks/useUser'
import { Error } from '@components/Error'
import { Loading } from '@components/Loading'

const items: BreadcrumbItem[] = [
  { title: 'Users', href: '/users' },
  { title: 'Show', current: true },
]

export const ShowUser = () => {
  const { id } = useParams()
  if (!id) return null

  const { error, isLoading, user } = useUser(id)

  if (error) return <Error items={items} error={error} />

  return (
    <MainLayout>
      <Heading title="Users" items={items} />

      <Box sx={{ p: 6 }}>
        <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Show User
              </Typography>
              {isLoading && <Loading />}
              {!isLoading && (
                <>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>First Name:</b> {user.first_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Last Name:</b> {user.last_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Email:</b> {user.email}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
                    <b>Role:</b> {user?.role?.name}
                  </Typography>
                  <Button variant="outlined" href="/users" sx={{ mr: 1 }}>
                    Back
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
