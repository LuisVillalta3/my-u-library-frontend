const apiUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3005'

const apiEndpoint = `${apiUrl}/api/v1`

export const GET_USERS_ENDPOINT = (
  page = 1,
  rowsPerPage = 10,
  name = ''
) => `${apiEndpoint}/users?page=${page}&rowsPerPage=${rowsPerPage}&name=${name}`
