import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [sortBooks, setSortBooks] = useState(null)

  if (result.loading) return <div>loading...</div>

  if (!props.show) {
    return null
  }

  const books = [...result.data.allBooks]
  const genres = books.map(book => book.genres)
  const num = genres.length
  const unique = []

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < genres[i].length; j++) {
      if (!unique.includes(genres[i][j])) {
        unique.push(genres[i][j])
      }
    }
  }

  const sortByGenre = (genre) => {
    // console.log(genre)
    if (genre === 'allGenres') {
      return setSortBooks(books.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))

    }

    return setSortBooks(books.filter(book => book.genres.includes(genre)).map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    ))
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
          {sortBooks}
        </tbody>
      </table>
      {unique.map((genre, i) => (
        <button key={i} onClick={() => sortByGenre(genre)}>{genre}</button>
      ))}
      {<button onClick={() => sortByGenre('allGenres')}>all genres</button>} 
    </div>
  )
}

export default Books