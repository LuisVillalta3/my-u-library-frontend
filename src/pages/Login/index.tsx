import React from 'react'
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material'
import { useDrawer } from '@hooks/useDrawer'
import { LoginForm } from '@components/loginForm'

export const Login = () => {
  const { DrawerHeader, AppBar } = useDrawer()
  const token = localStorage.getItem('token')

  React.useEffect(() => {
    if (token) localStorage.removeItem('token')
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My U Library
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Box sx={{ p: 6 }}>
          <Paper style={{ width: '100%' }} sx={{ p: 3 }} elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="h4" gutterBottom>
                  Login
                </Typography>
                <LoginForm />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
