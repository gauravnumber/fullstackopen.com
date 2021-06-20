import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log('error', error)
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user', token)
      props.setPage('authors')
    }
  }, [result.data]) // eslint-disable-line
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (<div>login loading...</div>)
  }

  // console.log('result.data', result.data)
  
  const handleLogin = async e => {
    e.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }


  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
