import React from 'react'
import { GET_BOOKS_ENDPOINT } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { Book } from '../../types'

type GetAllBooksProps = {
  page: number
  rowsPerPage: number
}

export type FetchResulBooks = {
  total: number
  rows: Book[]
}

export const getAllBooks = () => {
  const [params, setParams] = React.useState<GetAllBooksProps>({
    page: 1,
    rowsPerPage: 10,
  })
  const [data, setData] = React.useState<FetchResulBooks | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: GET_BOOKS_ENDPOINT,
    method: 'GET',
    params,
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

  return {
    isLoading,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    ...params,
  }
}
