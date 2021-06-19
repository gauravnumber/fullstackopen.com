import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME} from '../queries'

export default function Recommend(props) {
  const result = useQuery(ALL_BOOKS)
  const resultME = useQuery(ME)
  // const [me, setMe] = useState({})

  // useEffect(() => {
  //   if(resultME.data.me) {
  //     setMe({...resultME.data.me})
  //   }
  //   // console.log('me', me)

  // }, [resultME.data]) // eslint-disable-line

  if (result.loading || resultME.loading) return <div>recommendation loading...</div>

  if (!props.show) {
    return null
  }

  // if (!resultME.data) return null

  const books = [...result.data.allBooks]
  const me = {...resultME.data.me}
  console.log('resultME.data.me', resultME.data.me)
  console.log('me', me)
  // console.log('resultME.data.me.favoriteGenre', resultME.data.me.favoriteGenre)
  const favoriteGenre = me.favoriteGenre 
  // const genres = books.map(book => book.genres)
  // const num = genres.length
  // const unique = []

  // for (let i = 0; i < num; i++) {
  //   for (let j = 0; j < genres[i].length; j++) {
  //     if (!unique.includes(genres[i][j])) {
  //       unique.push(genres[i][j])
  //     }
  //   }
  // }

  // console.log('books', books)
  // console.log('resultME.data', resultME.data.me.favoriteGenre ?? "not resultME")

  const sortByGenre = (genre) => {
    // console.log(genre)
    // if (genre === 'allGenres') {
    //   return setSortBooks(books.map(a =>
    //     <tr key={a.title}>
    //       <td>{a.title}</td>
    //       <td>{a.author.name}</td>
    //       <td>{a.published}</td>
    //     </tr>
    //   ))

    // }

    return books.filter(book => book.genres.includes(genre)).map(book =>
      <tr key={book.title}>
        <td>{book.title}</td>
        <td>{book.author.name}</td>
        <td>{book.published}</td>
      </tr>
    )
    // return setSortBooks(books.filter(book => book.genres.includes(genre)).map(a =>
    //   <tr key={a.title}>
    //     <td>{a.title}</td>
    //     <td>{a.author.name}</td>
    //     <td>{a.published}</td>
    //   </tr>
    // ))
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
          {sortByGenre(favoriteGenre)}
          {/* {resultME && sortByGenre(favoriteGenre)} */}
          {/* {resultME && sortByGenre(resultME.data.me.favoriteGenre)} */}
          {/* <tr>
            <td></td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}
