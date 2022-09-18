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
}

export interface Book extends TimeStamps {
  id?: string | number
  description?: string
  title: string
  author_id: string | number
  genre_id: string | number
  published_date: string
  in_stock: number
  available: boolean
}

export type FetchResult = {
  total: number
  rows: User[]
}

export interface Author extends TimeStamps {
  firstName: string
  lastName: string
  id: string | number
  nacionality: string
  birthday: string
}
