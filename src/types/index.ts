export interface Column {
  id: string | number
  label: string
  minWidth?: number
  align?: 'right'
}

interface TimeStamps {
  created_at?: string
  updated_at?: string
}

export interface User extends TimeStamps {
  id: string | number
  first_name: string
  last_name: string
  role_id: string | number
  email: string
  role?: Role
  password?: string
  password_confirmation?: string
}

export interface Book extends TimeStamps {
  id: string | number
  description?: string
  title: string
  author_id: string | number | null
  genre_id: string | number | null
  author?: Author
  genre?: Genre
  published_date: string
  in_stock: number
  available: boolean
  check_out_requests?: CheckOutRequest[]
}

export type FetchResult = {
  total: number
  rows: User[]
}

export interface Author extends TimeStamps {
  first_name: string
  last_name: string
  id: string | number
  nacionality: string
  birthday: string
}

export interface Genre extends TimeStamps {
  id: string | number
  name: string
  description: string
}

export interface Role extends TimeStamps {
  id: string | number
  name: string
  description: string
  code: string
}

export interface Login {
  email: string
  password: string
}

export interface DecodedToken {
  exp: number
  user: string
  time: number
}

export interface RequestStatus extends TimeStamps {
  id: string | number
  name: string
  description: string
  code: string
}

export interface CheckOutRequest extends TimeStamps {
  id: string | number
  book_id: string | number
  user_id: string | number
  request_status_id: string | number
  user?: User
  book?: Book
  request_status?: RequestStatus
}
