/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { User } from '@types'
import { USER_ENDPOINT } from '@constants'
import axios, { AxiosRequestConfig } from 'axios'

type GetAllUsersProps = {
  page: number
  rowsPerPage: number
  first_name: string
  last_name: string
  email: string
}

export type FetchResultusers = {
  total: number
  rows: User[]
}

export const getAllUsers = () => {
  const [params, setParams] = React.useState<GetAllUsersProps>({
    page: 1,
    rowsPerPage: 10,
    first_name: '',
    last_name: '',
    email: '',
  })

  const [data, setData] = React.useState<FetchResultusers | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: USER_ENDPOINT,
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

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, email: event.target.value })
  }

  return {
    data,
    isLoading,
    error,
    handleChangeFirstName,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeLastName,
    handleChangeEmail,
    ...params,
    setError,
    setIsLoading,
    setParams,
  }
}
