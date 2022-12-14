/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import React from 'react'
import { Book } from '@types'
import { BOOK_ENDPOINT } from '@constants'
import { SelectChangeEvent } from '@mui/material'

type GetAllBooksProps = {
  page: number
  rowsPerPage: number
  title: string
  author_id: string | number
  genre_id: string | number
}

export type FetchResultBooks = {
  total: number
  rows: Book[]
}

export const getAllBooks = () => {
  const [params, setParams] = React.useState<GetAllBooksProps>({
    page: 1,
    rowsPerPage: 10,
    title: '',
    author_id: '',
    genre_id: '',
  })
  const [data, setData] = React.useState<FetchResultBooks | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: BOOK_ENDPOINT,
    method: 'GET',
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  React.useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const res = await axios(config)
        setData(res.data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [params])

  const handleChangePage = (event: unknown, newPage: number) => {
    setParams({ ...params, page: newPage })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParams({ ...params, rowsPerPage: +event.target.value, page: 1 })
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, title: event.target.value })
  }

  const handleChangeAuthor = (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => {
    setParams({ ...params, author_id: event.target.value })
  }

  const handleChangeGenre = (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode
  ) => {
    setParams({ ...params, genre_id: event.target.value })
  }

  return {
    isLoading,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeTitle,
    ...params,
    setError,
    setIsLoading,
    setParams,
    handleChangeAuthor,
    handleChangeGenre,
  }
}
