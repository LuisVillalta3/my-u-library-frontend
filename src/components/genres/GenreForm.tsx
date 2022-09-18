import React from 'react'
import { Formik, Form } from 'formik'
import { GenreSchema } from '@schemas/genreFormSchema'
import { Button, TextField } from '@mui/material'
import { Genre } from '@types'

type Props = {
  genre: Genre
  setGenre: (genre: Genre) => void
  setIsValid: (isValid: boolean) => void
  isLoading: boolean
}

export const GenreForm: React.FC<Props> = ({
  genre,
  isLoading,
  setGenre,
  setIsValid,
}) => {
  return (
    <Formik
      initialValues={{
        name: genre.name,
        description: genre.description,
      }}
      validationSchema={GenreSchema}
      onSubmit={(values) => {
        setGenre({ ...genre, ...values })
        setIsValid(true)
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="name"
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="description"
            variant="outlined"
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
          <Button variant="contained" type="submit" disabled={isLoading}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}
