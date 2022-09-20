import React, { ReactNode } from 'react'
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import axios, { AxiosRequestConfig } from 'axios'
import { AUTHOR_ENDPOINT, GENRE_ENDPOINT } from '@constants'
import { Author, Genre } from '@types'
import ClearIcon from '@mui/icons-material/Clear'

type Props = {
  handleChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void
  title: string
  handleChangeAuthor: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void
  author_id: string | number
  handleChangeGenre: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode
  ) => void
  genre_id: string | number
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

export const BookFilter: React.FC<Props> = ({
  handleChangeTitle,
  title,
  author_id,
  genre_id,
  handleChangeAuthor,
  handleChangeGenre,
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

  const handleClearAuthorClick = () => {
    handleChangeAuthor({ target: { value: '' } } as SelectChangeEvent, null)
  }

  const handleClearGenreClick = () => {
    handleChangeGenre({ target: { value: '' } } as SelectChangeEvent, null)
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{ mb: 3, paddingRight: 3, paddingLeft: 3 }}
      justifyContent="flex-end"
    >
      <Grid item xs={24} md={4}>
        <TextField
          id="name-filter"
          label="Search by title"
          fullWidth
          margin="dense"
          variant="outlined"
          onInput={handleChangeTitle}
          value={title}
        />
      </Grid>
      <Grid item xs={24} md={4}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="author-label">Author</InputLabel>
          <Select
            labelId="author-label"
            id="author"
            name="author_id"
            value={author_id}
            label="Author"
            onChange={handleChangeAuthor}
            endAdornment={
              <IconButton
                sx={{ visibility: author_id ? 'visible' : 'hidden' }}
                onClick={handleClearAuthorClick}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            {authors.map(({ id, first_name, last_name }) => (
              <MenuItem value={id} key={id}>
                {first_name} {last_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={24} md={4}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre"
            name="genre_id"
            value={genre_id}
            label="Genre"
            onChange={handleChangeGenre}
            endAdornment={
              <IconButton
                sx={{ visibility: genre_id ? 'visible' : 'hidden' }}
                onClick={handleClearGenreClick}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            {genres.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
