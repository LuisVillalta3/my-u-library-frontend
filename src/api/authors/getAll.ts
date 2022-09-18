/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import React from 'react'
import { Author } from '../../types/index'
import { GET_ALL_AUTHORS } from '../../constants'

type FetchSimpleAuthorProps = {
  authors: Author[]
}

export const getAllAuthors = () => {
  return {}
}

export const getSimpleAuthors = () => {
  const [data, setData] = React.useState<FetchSimpleAuthorProps | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<any>(null)

  const config: AxiosRequestConfig = {
    url: GET_ALL_AUTHORS,
    method: 'GET',
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
