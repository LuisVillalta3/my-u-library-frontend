export interface Column {
  id: string | number
  label: string
  minWidth?: number
  align?: 'right'
}

export interface User {
  id: string | number
  first_name: string
  last_name: string
  role_id: string | number
  email: string
  created_at: string
  updated_at: string
}
