/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Formik, Form } from 'formik'
import { BookSchema } from '@schemas/bookFormSchema'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Author, Book, Genre } from '@types'
import { AUTHOR_ENDPOINT, GENRE_ENDPOINT } from '@constants'
import axios, { AxiosRequestConfig } from 'axios'

type Props = {
  book: Book
  setBook: (book: Book) => void
  setIsValid: (isValid: boolean) => void
  isLoading: boolean
}

const configAuthors: AxiosRequestConfig = {
  url: AUTHOR_ENDPOINT,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

const configGenres: AxiosRequestConfig = {
  url: GENRE_ENDPOINT,
  method: 'GET',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

export const BookForm: React.FC<Props> = ({
  book,
  isLoading,
  setBook,
  setIsValid,
}) => {
  const [authors, setAuthors] = React.useState<Author[]>([])
  const [genres, setGenres] = React.useState<Genre[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const resAuthors = await axios(configAuthors)
      const resGenres = await axios(configGenres)
      setAuthors(resAuthors.data as Author[])
      setGenres(resGenres.data as Genre[])
    }
    fetchData()
  }, [])

  return (
    <Formik
      initialValues={{
        title: book.title,
        description: book.description,
        author_id: book.author_id,
        genre_id: book.genre_id,
        available: book.available,
        in_stock: book.in_stock,
        published_date: book.published_date,
      }}
      validationSchema={BookSchema}
      onSubmit={(values) => {
        setBook({ ...book, ...values })
        setIsValid(true)
      }}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="title"
            variant="outlined"
            name="title"
            label="Title"
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
              labelId="author-label"
              id="author"
              name="author_id"
              value={values.author_id}
              label="Author"
              onChange={handleChange}
              error={touched.author_id && Boolean(errors.author_id)}
            >
              {authors.map(({ id, first_name, last_name }) => (
                <MenuItem value={id} key={id}>
                  {[first_name, last_name].join(' ')}
                </MenuItem>
              ))}
            </Select>
            {touched.author_id && (
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="red"
                sx={{ pl: 2 }}
              >
                {errors.author_id}
              </Typography>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              name="genre_id"
              value={values.genre_id}
              label="Genre"
              onChange={handleChange}
              error={touched.genre_id && Boolean(errors.genre_id)}
            >
              {genres.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {touched.genre_id && (
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                color="red"
                sx={{ pl: 2 }}
              >
                {errors.genre_id}
              </Typography>
            )}
          </FormControl>
          <TextField
            fullWidth
            sx={{ mb: 3 }}
            id="in_stock"
            variant="outlined"
            name="in_stock"
            label="In Stock"
            value={values.in_stock}
            type="number"
            onChange={handleChange}
            error={touched.in_stock && Boolean(errors.in_stock)}
            helperText={touched.in_stock && errors.in_stock}
          />
          <InputLabel id="published_date-label">Published date</InputLabel>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              fullWidth
              sx={{ mb: 3 }}
              id="published_date"
              variant="outlined"
              name="published_date"
              value={values.published_date}
              type="date"
              onChange={handleChange}
              error={touched.published_date && Boolean(errors.published_date)}
              helperText={touched.published_date && errors.published_date}
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
