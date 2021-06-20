import React from 'react'
import AuthorBirthYearForm from './AuthorBirthYearForm'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) return <div>loading...</div>
  if (!props.show) {
    return null
  }

  // console.log('result.data', result.data)
  // return (<h1>Authors.js</h1>)

  const authors = [...result.data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <AuthorBirthYearForm />
    </div>
  )
}

export default Authors
