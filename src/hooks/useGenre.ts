/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { Genre } from '@types'
import { GENRE_ENDPOINT } from '@constants'

export const useGenre = (id: string | number) => {
  const config: AxiosRequestConfig = {
    url: `${GENRE_ENDPOINT}/${id}`,
    method: 'GET',
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [genre, setGenre] = React.useState<Genre>({
    id: 0,
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
  })

  React.useEffect(() => {
    const fetchGenre = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios(config)
        setGenre({ ...genre, ...data })
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGenre()
  }, [])

  return {
    genre,
    setGenre,
    isLoading,
    error,
    setError,
    setIsLoading,
  }
}
