import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '../reducer/notificationReducer'
import { addBlog } from '../reducer/blogReducer'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
// import BlogsDetailsHeader from './BlogsDetailsHeader'

export default function BlogsDetails() {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  blogs.sort((a, b) => b.likes - a.likes)

  const handleCreateBlog = async e => {
    e.preventDefault()
    // console.log('object title', { title, author, url })
    // console.log('user', user)
    const blog = {
      title,
      author,
      url
    }

    try {
      const createdBlog = await blogService.create(blog)
      dispatch(addBlog(createdBlog))
      // dispatch(addBlog(blog))

      // console.log('blog', blog)
      // console.log('createdBlog', createdBlog)

      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(setMessage(`a new blog ${createdBlog.title} by ${createdBlog.author}`, 'added'))

      setTimeout(() => {
        dispatch(setMessage(null))
      }, 5000)
      // console.log('createdBlog', createdBlog)
    }
    catch (exception) {
      console.log('exception', exception)
    }
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


  // console.log('user', user)
  // console.log('blogs', blogs)
  return (
    <div>
      {/* <BlogsDetailsHeader /> */}
      {user && createBlog()}
      <div id="blogs-container">
        {blogs && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}
