import React, { useState } from 'react'
import {
  useQuery,
  useMutation
} from '@apollo/client'
import {
  ALL_AUTHORS,
  EDIT_AUTHOR_BORN
} from '../queries'

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}

const AuthorBirthYearForm = () => {
  const [authorName, setAuthorName] = useState('')
  // const { reset: nameReset, ...name } = useField('text')
  const { reset: bornReset, ...born } = useField('text')

  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      }
    ]
  })

  const result = useQuery(ALL_AUTHORS)
  if (result.loading) return <div>loading...</div>

  const authors = [...result.data.allAuthors]

  const handleBorn = (e) => {
    e.preventDefault()
    const args = { name: authorName, born: Number(born.value) }
    // const args = { name: name.value, born: Number(born.value) }

    editAuthor({ variables: args })
    // nameReset()
    bornReset()
  }

  const select = {
    width: '100%'
  }

  const handleAuthorChange = e => setAuthorName(e.target.value)

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={handleBorn}>
        <select style={select} onChange={handleAuthorChange}>
          <option>Select author name</option>
          {authors.map(author => <option key={author.name} value={author.value} >{author.name}</option>)}
        </select>
        <br />
        <label>born</label>
        <input {...born} />
        <br />
        <button>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYearForm