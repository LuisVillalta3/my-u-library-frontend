import { SelectChangeEvent } from '@mui/material'
import React from 'react'
import { Book } from '@types'

export const useBook = (id?: string | number) => {
  const [book, setBook] = React.useState<Book>({
    id: 0,
    title: '',
    author_id: '',
    available: false,
    created_at: '',
    updated_at: '',
    genre_id: '',
    in_stock: 0,
    published_date: '',
    description: '',
  })

  const handleBookTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, title: event.target.value })
  }

  const handleBookAuthor = (event: SelectChangeEvent<string | number>) => {
    setBook({ ...book, author_id: +event.target.value })
  }

  const handleBookGenre = (event: SelectChangeEvent<string | number>) => {
    setBook({ ...book, genre_id: +event.target.value })
  }

  const handleBookPublishedDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBook({ ...book, published_date: event.target.value })
  }

  const handleBookDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBook({ ...book, description: event.target.value })
  }

  const handleBookInStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, in_stock: +event.target.value })
  }

  const handleBookAvailable = (event: any) => {
    setBook({ ...book, available: event.target.checked })
  }

  return {
    book,
    handleBookTitle,
    handleBookAuthor,
    handleBookGenre,
    handleBookPublishedDate,
    handleBookDescription,
    handleBookInStock,
    handleBookAvailable,
  }
}
