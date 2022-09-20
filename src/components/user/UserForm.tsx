import React from 'react'
import { Formik, Form } from 'formik'
import { UserSchema } from '@schemas/userFormSchema'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Role, User } from '@types'
import axios, { AxiosRequestConfig } from 'axios'
import { ROLE_ENDPOINT } from '@constants'

type Props = {
  user: User
  setUser: (user: User) => void
  setIsValid: (isValid: boolean) => void
  isLoading: boolean
}

const configRoles: AxiosRequestConfig = {
  url: ROLE_ENDPOINT,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

export const UserForm: React.FC<Props> = ({
  user,
  isLoading,
  setUser,
  setIsValid,
}) => {
  const [roles, setRoles] = React.useState<Role[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios(configRoles)
      setRoles(res.data as Role[])
    }
    fetchData()
  }, [])

  return (
    <Formik
      initialValues={{
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role_id: user.role_id,
        password: '',
        password_confirmation: '',
      }}
      validationSchema={UserSchema}
      onSubmit={(values) => {
        setUser({ ...user, ...values })
        setIsValid(true)
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="first_name"
            variant="outlined"
            name="first_name"
            label="Fist Name"
            value={values.first_name}
            onChange={handleChange}
            error={touched.first_name && Boolean(errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="last_name"
            variant="outlined"
            name="last_name"
            label="Last Name"
            value={values.last_name}
            onChange={handleChange}
            error={touched.last_name && Boolean(errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
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
            variant="outlined"
            type="password"
            name="password"
            label="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            type="password"
            variant="outlined"
            id="password_confirmation"
            name="password_confirmation"
            label="password_confirmation"
            value={values.password_confirmation}
            onChange={handleChange}
            error={
              touched.password_confirmation &&
              Boolean(errors.password_confirmation)
            }
            helperText={
              touched.password_confirmation && errors.password_confirmation
            }
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role_id"
              value={values.role_id}
              label="role"
              onChange={handleChange}
              error={touched.role_id && Boolean(errors.role_id)}
            >
              {roles.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {touched.role_id && (
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="red"
                sx={{ pl: 2 }}
              >
                {errors.role_id}
              </Typography>
            )}
          </FormControl>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}
