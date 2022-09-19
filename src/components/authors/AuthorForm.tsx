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
        first_name: author.first_name,
        last_name: author.last_name,
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
