import React, { useState, useEffect } from 'react'
import {
  useQuery,
  useLazyQuery,
} from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const resultALL = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [unique, setUnique] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    } else if (resultALL.data) {
      setBooks(resultALL.data.allBooks)
    }
  }, [result.data, resultALL.data]) // eslint-disable-line

  if (result.loading) return <div>loading...</div>

  if (!props.show) {
    return null
  }

  if (books.length) {
    const genres = books.map(book => book.genres)
    const num = genres.length

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < genres[i].length; j++) {
        if (!unique.includes(genres[i][j])) {
          // unique.push(genres[i][j])
          setUnique(unique.concat(genres[i][j]))
        }
      }
    }

  }

  const showBooks = (genre) => {
    if (genre === 'allGenres') {
      return setBooks(resultALL.data.allBooks)
    }

    getBooks({ variables: { genre } })
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>patterns</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {unique.map((genre, i) => (
        <button key={i} onClick={() => showBooks(genre)}>{genre}</button>
      ))}
      {<button onClick={() => showBooks('allGenres')}>all genres</button>}
    </div>
  )
}

export default Books