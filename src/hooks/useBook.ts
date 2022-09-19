/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { Book } from '@types'
import { BOOK_ENDPOINT } from '@constants'

export const useBook = (id: string | number) => {
  const config: AxiosRequestConfig = {
    url: `${BOOK_ENDPOINT}/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [book, setBook] = React.useState<Book>({
    id: 0,
    title: '',
    description: '',
    author_id: 0,
    available: false,
    genre_id: 0,
    in_stock: 0,
    published_date: '',
    created_at: '',
    updated_at: '',
  })

  React.useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios(config)
        setBook({ ...book, ...data })
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [])

  return {
    book,
    setBook,
    isLoading,
    error,
    setError,
    setIsLoading,
  }
}
