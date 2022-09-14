import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header>
        <Container maxWidth="xl">
        <Link to='/'>
          <FontAwesomeIcon icon={faBook} />
          <h1>My U Library</h1>
        </Link>

        </Container>
      </header>
      <main>
        {!!children && children}
      </main>
    </>
  )
}
