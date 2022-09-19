/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import React from 'react'
import { Author } from '@types'
import { AUTHOR_ENDPOINT } from '@constants'

type FetchSimpleAuthorProps = {
  authors: Author[]
}

type GetAllAuthorsProps = {
  page: number
  rowsPerPage: number
  first_name: string
  last_name: string
}

export type FetchResultAuthors = {
  total: number
  rows: Author[]
}

export const getAllAuthors = () => {
  const [params, setParams] = React.useState<GetAllAuthorsProps>({
    page: 1,
    rowsPerPage: 10,
    first_name: '',
    last_name: '',
  })
  const [data, setData] = React.useState<FetchResultAuthors | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: AUTHOR_ENDPOINT,
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

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParams({ ...params, first_name: event.target.value })
  }

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, last_name: event.target.value })
  }

  return {
    isLoading,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeFirstName,
    handleChangeLastName,
    ...params,
    setError,
    setIsLoading,
    setParams,
  }
}

export const getSimpleAuthors = () => {
  const [data, setData] = React.useState<FetchSimpleAuthorProps | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: AUTHOR_ENDPOINT,
    method: 'GET',
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
  }, [])

  return {
    isLoading,
    data,
    error,
  }
}
