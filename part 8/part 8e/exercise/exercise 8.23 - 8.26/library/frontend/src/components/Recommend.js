import React, { useState, useEffect } from 'react'
import {
  useQuery,
} from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

export default function Recommend(props) {
  const [books, setBooks] = useState([])
  const [me, setMe] = useState({})
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: me.favoriteGenre },
  })
  const resultME = useQuery(ME)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }

    if (resultME.data) {
      setMe(resultME.data.me)
    }
  }, [result, resultME]) // eslint-disable-line

  if (result.loading || resultME.loading) return <div>recommendation loading...</div>

  if (!props.show) {
    return null
  }

  const sortByGenre = () => {
    return books.map(book =>
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.published}</td>
      </tr>
    )
  }

  return (
    <div>
      <h1>
        recommendations
      </h1>
      <p>books in your favorite genres <b>patterns</b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {sortByGenre()}
        </tbody>
      </table>
    </div>
  )
}
