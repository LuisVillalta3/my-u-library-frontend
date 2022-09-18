import React from 'react'
import { Button, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { Book } from '../../types/index';
import { useBook } from '../../hooks/useBook'
import { getSimpleAuthors } from '../../api/authors/getAll';

export const BookForm = () => {
  const {
    book, handleBookAuthor, handleBookAvailable, handleBookDescription, handleBookGenre, handleBookInStock, handleBookTitle
  } = useBook()
  const { title, author_id, genre_id, description, in_stock, available } = book

  const { data } = getSimpleAuthors()
  
  console.log(data)

  return (
    <>
      <TextField
        id="title"
        label="Title"
        fullWidth
        variant="outlined" sx={{ mb: 3 }}
        value={title}
        onChange={handleBookTitle}
      />
      <TextField
        id="description"
        label="Description"
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
        value={description}
        onChange={handleBookDescription}
      />
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="author">Author</InputLabel>
        <Select
          labelId="author"
          id="author"
          fullWidth
          value={author_id}
          onChange={handleBookAuthor}
          label="Author"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="genre">Genre</InputLabel>
        <Select
          labelId="genre"
          id="genre"
          fullWidth
          value={genre_id}
          onChange={handleBookGenre}
          label="genre"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      {/* <DesktopDatePicker
        label="Date desktop"
        inputFormat="MM/DD/YYYY"
        value={published_date}
        onChange={handleBookPublishedDate}
        renderInput={(params: any) => <TextField {...params} />}
      /> */}
      <TextField
        id="in_stock"
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
        label="Quantity in stock"
        value={in_stock}
        onChange={handleBookInStock}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        type="number"
      />
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Available"
          value={available}
          onChange={handleBookAvailable}
        />
      </FormGroup>
      <Button variant="contained" sx={{ m: 3 }}>
        Save
      </Button>
    </>
  )
}
