import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMessage,
} from './reducer/notificationReducer'
import { initializeBlogs, addBlog } from './reducer/blogReducer'
import { userStoreAction } from './reducer/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  // const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      dispatch(userStoreAction(user))
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        dispatch(initializeBlogs(blogs))
      })

      console.log('user in useEffect', user)
    }

  }, [dispatch])

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

      // setUser(user)
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

  const handleCreateBlog = async e => {
    e.preventDefault()
    console.log('object title', { title, author, url })
    console.log('user', user)
    const blog = {
      title,
      author,
      url
    }

    try {
      const createdBlog = await blogService.create(blog)
      dispatch(addBlog(blog))

      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`, 'added'))

      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      console.log('createdBlog', createdBlog)
    }
    catch (exception) {
      console.log('exception', exception)
    }
  }

  const loginForm = () => (
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

  const blogsDetails = () => {
    blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button
            id="logout-button"
            onClick={() => {
              window.localStorage.clear()
              // setUser('')
              dispatch(userStoreAction(''))
              blogService.setToken = null
              dispatch(initializeBlogs([]))
            }}>
            logout
          </button>
        </div>
        {user && createBlog()}
        <div id="blogs-container">
          {blogs && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
  const createBlog = () => (
    <Togglable buttonLabel="create new note" >
      <CreateBlog
        handleCreateBlog={handleCreateBlog}
        title={title}
        author={author}
        url={url}
        handleTitle={({ target }) => setTitle(target.value)}
        handleAuthor={({ target }) => setAuthor(target.value)}
        handleUrl={({ target }) => setUrl(target.value)}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null ?
        loginForm() :
        blogsDetails()
      }
    </div>
  )
}

export default App