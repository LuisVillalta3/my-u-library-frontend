/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import React from 'react'
import { CheckOutRequest } from '@types'
import { CHECKOUT_ENDPOINT } from '@constants'
import { SelectChangeEvent } from '@mui/material'

type GetAllCheckOutRequestsProps = {
  page: number
  rowsPerPage: number
  user_id?: number | string
}

export type FetchResultCheckOutRequests = {
  total: number
  rows: CheckOutRequest[]
}

export const getAllCheckOutRequests = (user_id: string | number) => {
  const [params, setParams] = React.useState<GetAllCheckOutRequestsProps>({
    page: 1,
    rowsPerPage: 10,
    user_id,
  })
  const [data, setData] = React.useState<FetchResultCheckOutRequests | null>(
    null
  )
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: CHECKOUT_ENDPOINT,
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

  return {
    isLoading,
    data,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    ...params,
    setError,
    setIsLoading,
    setParams,
  }
}
