import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '@pages/Dashboard'
import { Users } from '@pages/Users'
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

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Users />} />
          {/* BOOKS */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/:id" element={<ShowBook />} />
          <Route path="/books/:id/edit" element={<EditBook />} />
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
          {/*  */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
