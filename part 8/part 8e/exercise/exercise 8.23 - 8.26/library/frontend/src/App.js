import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import {
  BOOK_ADDED,
  ALL_BOOKS,
} from './queries'
import {
  useApolloClient,
  useSubscription,
} from '@apollo/client'


const App = () => {
  // const [page, setPage] = useState('authors') 
  const [page, setPage] = useState('books') 
  // const [page, setPage] = useState('add')

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    console.log('updateCacheWith addedBook', addedBook)
    console.log('addedBook?.genres[0]', addedBook?.genres[0])

    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    // const dataInStoreGenre = client.readQuery({ 
    //   query: ALL_BOOKS,
    //   variables: {
    //     // genre: 'cool',
    //     // genre: 'wow',
    //     genre: addedBook?.genres[0],
    //   }
    // })

    // console.log('dataInStoreGenre', dataInStoreGenre)
    console.log('dataInStore.allBooks', dataInStore.allBooks)
    console.log('allBooks', { allBooks: dataInStore.allBooks.concat(addedBook) })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem('library-user')
      setToken(token)
    }
  }, [token])

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
          <div style={{ display: 'inline' }}>
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
        updateCacheWith={updateCacheWith}
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