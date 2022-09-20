import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// DASHBOARD
import { Dashboard } from '@pages/Dashboard'
// USERS
import { Users } from '@pages/Users'
import { CreateUser } from '@pages/Users/create'
import { ShowUser } from '@pages/Users/show'
// BOOKS
import { Books } from '@pages/Books'
import { CreateBook } from '@pages/Books/Create'
import { ShowBook } from '@pages/Books/show'
import { EditBook } from '@pages/Books/edit'
// AUTHORS
import { Authors } from '@pages/Authors'
import { CreateAuthor } from '@pages/Authors/create'
import { EditAuthor } from '@pages/Authors/edit'
import { ShowAuthor } from '@pages/Authors/show'
// GENRES
import { Genres } from '@pages/Genres'
import { CreateGenre } from '@pages/Genres/create'
import { ShowGenre } from '@pages/Genres/show'
import { EditGenre } from '@pages/Genres/edit'
// LOGIN
import { Login } from '@pages/Login'
// CHECKOUTS
import { CheckOutRequests } from '@pages/CheckOuts'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* USERS */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id" element={<ShowUser />} />
          {/* AUTHORS */}
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<ShowAuthor />} />
          <Route path="/authors/create" element={<CreateAuthor />} />
          <Route path="/authors/:id/edit" element={<EditAuthor />} />
          {/* GENRES */}
          <Route path="/genres" element={<Genres />} />
          <Route path="/genres/create" element={<CreateGenre />} />
          <Route path="/genres/:id" element={<ShowGenre />} />
          <Route path="/genres/:id/edit" element={<EditGenre />} />
          {/* BOOKS */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:id" element={<ShowBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* CHECKOUTS */}
          <Route path="/check-outs" element={<CheckOutRequests />} />
          {/* LOGIN */}
          <Route path="/login" element={<Login />} />
          {/* OTHERS */}
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
