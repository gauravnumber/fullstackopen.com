import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('gaurav')
  const [password, setPassword] = useState('anything')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )

      console.log('user in useEffect', user)
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
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setErrorMessage(null)

      }, 5000)
    }

  }

  const handleCreateBlog = async e => {
    e.preventDefault()
    console.log('object title', { title, author, url })
    console.log('user', user)
    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`)
      setNotificationType('added')

      setTimeout(() => {
        setErrorMessage(null)
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
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogsDetails = () => {
    blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={() => {
            window.localStorage.clear()
            setUser('')
            blogService.setToken = null
            setBlogs([])
          }}>
            logout
          </button>
        </div>
        {user && createBlog()}
        <div>
          {blogs.map(blog =>
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
      <Notification message={errorMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        blogsDetails()
      }
    </div>
  )
}

export default App