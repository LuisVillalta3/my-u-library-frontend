import React from 'react'
import { Genre } from '@types'
import { GENRE_ENDPOINT } from '@constants'
import axios, { AxiosRequestConfig } from 'axios'

type GetAllGenresProps = {
  page: number
  rowsPerPage: number
  name: string
}

export type FetchResultGenres = {
  total: number
  rows: Genre[]
}

export const getAllGenres = () => {
  const [params, setParams] = React.useState<GetAllGenresProps>({
    page: 1,
    rowsPerPage: 10,
    name: '',
  })

  const [data, setData] = React.useState<FetchResultGenres | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: GENRE_ENDPOINT,
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

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, name: event.target.value })
  }

  return {
    data,
    isLoading,
    error,
    handleChangeName,
    handleChangePage,
    handleChangeRowsPerPage,
    ...params,
    setError,
    setIsLoading,
    setParams,
  }
}
