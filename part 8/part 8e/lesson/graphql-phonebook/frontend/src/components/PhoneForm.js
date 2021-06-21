import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_NUMBER, ALL_PERSONS } from './queries'

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    onError: (error) => {
      console.log('error.phQLErrors', error.graphQLErrors)
      // setError('something wrong happened')
      setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson]
        }
      })
    }
  })

  useEffect(() => {
    // console.log('result', result)
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

export default PhoneForm