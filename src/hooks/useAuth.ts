import React from 'react'
import { useJwt } from 'react-jwt'
import { DecodedToken } from '@types'

export const useAuth = () => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem('token')
  )
  const login = (myToken: string) => {
    localStorage.setItem('token', myToken)
    setToken(myToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  const checkAuth = (): boolean => {
    if (!token) return false

    const { decodedToken } = useJwt<DecodedToken>(token)
    if (!decodedToken) return true
    const { time } = decodedToken
    const exp = new Date(time * 1000)
    const now = new Date()

    return exp < now
  }

  const getDecodedToken = (): DecodedToken | null => {
    if (!token) return null

    const { decodedToken } = useJwt<DecodedToken>(token)
    return decodedToken
  }

  return { token, login, logout, checkAuth, getDecodedToken }
}
