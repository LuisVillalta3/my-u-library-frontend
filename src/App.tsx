import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { Users } from './pages/Users'
import { Books } from './pages/Books'
import { CreateBook } from './pages/Books/Create'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
