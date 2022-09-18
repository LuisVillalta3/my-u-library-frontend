/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { GET_USERS_ENDPOINT } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { FetchResult } from '../../types'

type GetAllUsersProps = {
  page: number
  rowsPerPage: number
  name?: string
}

export const getAllUsers = () => {
  const [params, setParams] = React.useState<GetAllUsersProps>({
    page: 1,
    rowsPerPage: 10,
    name: '',
  })
  const [data, setData] = React.useState<FetchResult | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: GET_USERS_ENDPOINT,
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
    isLoading,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeName,
    ...params,
  }
}
