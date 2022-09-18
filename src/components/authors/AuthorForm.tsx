import React from 'react'
import { Formik, Form } from 'formik'
import { AuthorSchema } from '@schemas/authorFormSchema'
import { Button, FormControl, InputLabel, TextField } from '@mui/material'
import { Author } from '@types'

type Props = {
  author: Author
  setAuthor: (author: Author) => void
  setIsValid: (isValid: boolean) => void
  isLoading: boolean
}

export const AuthorForm: React.FC<Props> = ({
  author,
  isLoading,
  setAuthor,
  setIsValid,
}) => {
  return (
    <Formik
      initialValues={{
        firstName: author.firstName,
        lastName: author.lastName,
        nacionality: author.nacionality,
        birthday: author.birthday,
      }}
      validationSchema={AuthorSchema}
      onSubmit={(values) => {
        setAuthor({ ...author, ...values })
        setIsValid(true)
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="firstName"
            variant="outlined"
            name="firstName"
            label="Fist Name"
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="lastName"
            variant="outlined"
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="nacionality"
            variant="outlined"
            name="nacionality"
            label="Nacionality"
            value={values.nacionality}
            onChange={handleChange}
            error={touched.nacionality && Boolean(errors.nacionality)}
            helperText={touched.nacionality && errors.nacionality}
          />
          <InputLabel id="Birthday">Birthday</InputLabel>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              fullWidth
              sx={{ mb: 3 }}
              id="birthday"
              variant="outlined"
              name="birthday"
              type="date"
              value={values.birthday}
              onChange={handleChange}
              error={touched.birthday && Boolean(errors.birthday)}
              helperText={touched.birthday && errors.birthday}
            />
          </FormControl>
          <Button variant="contained" type="submit" disabled={isLoading}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}
