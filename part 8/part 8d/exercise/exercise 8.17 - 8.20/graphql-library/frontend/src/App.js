import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors') 
  // const [page, setPage] = useState('recommend') 
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem('library-user')
      setToken(token)
    }
  }, [token])

  // console.log('token', token)
  
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => {
          setPage('login')
        }}>login</button>}
        {token !== null &&
          <div style={{display: 'inline'}}>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </div>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        setPage={setPage}
        show={page === 'login'}
        setToken={setToken}
      />

      <Recommend
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App