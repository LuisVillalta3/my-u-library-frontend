/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { Formik, Form } from 'formik'
import { Button, TextField } from '@mui/material'
import { LoginSchema } from '@schemas/loginFormSchema'
import { Login } from '@types'
import { AUTH_ENDPOINT } from '@constants'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const config: AxiosRequestConfig = {
  url: AUTH_ENDPOINT,
  method: 'POST',
}

export const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isValid, setIsValid] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [login, setLogin] = React.useState<Login>({
    email: '',
    password: '',
  })

  const { login: setLoginInLocalStorage } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        config.data = login
        const res = await axios(config)
        setLoginInLocalStorage(res.data?.token)
        navigate('/')
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (login.email != '' && login.password != '') fetchData()
  }, [isValid])

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        setLogin(values)
        setIsValid(true)
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="email"
            variant="outlined"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="password"
            type="password"
            variant="outlined"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button variant="contained" type="submit" disabled={isLoading}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}
