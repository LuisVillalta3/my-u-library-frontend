/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { Author } from '@types'
import { AUTHOR_ENDPOINT } from '@constants'

export const useAuthor = (id: string | number) => {
  const config: AxiosRequestConfig = {
    url: `${AUTHOR_ENDPOINT}/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [author, setAuthor] = React.useState<Author>({
    first_name: '',
    last_name: '',
    id: 0,
    nacionality: '',
    birthday: '',
    created_at: '',
    updated_at: '',
  })

  React.useEffect(() => {
    const fetchAuthor = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios(config)
        setAuthor({ ...author, ...data })
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAuthor()
  }, [])

  return {
    author,
    setAuthor,
    isLoading,
    error,
    setError,
    setIsLoading,
  }
}
