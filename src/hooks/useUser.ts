/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { User } from '@types'
import { USER_ENDPOINT } from '@constants'

export const useUser = (id: string | number) => {
  const config: AxiosRequestConfig = {
    url: `${USER_ENDPOINT}/${id}`,
    method: 'GET',
  }

  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<any>(null)
  const [user, setUser] = React.useState<User>({
    first_name: '',
    last_name: '',
    id: 0,
    email: '',
    role_id: '',
    created_at: '',
    updated_at: '',
  })

  React.useEffect(() => {
    const fetchuser = async () => {
      setIsLoading(true)
      try {
        const { data } = await axios(config)
        setUser({ ...user, ...data })
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchuser()
  }, [])

  return {
    user,
    setUser,
    isLoading,
    error,
    setError,
    setIsLoading,
  }
}
