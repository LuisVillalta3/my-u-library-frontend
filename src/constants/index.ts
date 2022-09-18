const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3005'

const apiEndpoint = `${apiUrl}/api/v1`

export const GET_USERS_ENDPOINT = `${apiEndpoint}/users`

export const GET_BOOKS_ENDPOINT = `${apiEndpoint}/books`

export const AUTHOR_ENDPOINT = `${apiEndpoint}/author`
export const GENRE_ENDPOINT = `${apiEndpoint}/genres`
