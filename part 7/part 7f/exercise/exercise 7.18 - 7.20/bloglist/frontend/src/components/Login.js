import React, { useState, useEffect, useRef } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducer/blogReducer'
import { userStoreAction } from '../reducer/userReducer'
import { setMessage } from '../reducer/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const _isMounted = useRef(true) // Initial value _isMounted = true
  useEffect(() => {
    return () => { // ComponentWillUnmount in Class Component
      _isMounted.current = false
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService
        .login({
          username,
          password
        })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('user in handleLogin()', user)

      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        dispatch(initializeBlogs(blogs))
      })

      dispatch(userStoreAction(user))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setMessage('wrong username or password', 'error'))
      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
    }

  }


  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        username
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id="submit-button"
        type="submit"
      >login</button>
    </form>
  )

}

export default Login