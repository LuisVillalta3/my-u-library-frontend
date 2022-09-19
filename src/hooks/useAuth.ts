import React from 'react'

export const useAuth = () => {
  const [token, setToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return { token, login, logout }
}
