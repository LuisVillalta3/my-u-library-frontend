const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3005'

const apiEndpoint = `${apiUrl}/api/v1`

export const USER_ENDPOINT = `${apiEndpoint}/users`
export const BOOK_ENDPOINT = `${apiEndpoint}/books`
export const AUTHOR_ENDPOINT = `${apiEndpoint}/author`
export const GENRE_ENDPOINT = `${apiEndpoint}/genres`
export const ROLE_ENDPOINT = `${apiEndpoint}/roles`
