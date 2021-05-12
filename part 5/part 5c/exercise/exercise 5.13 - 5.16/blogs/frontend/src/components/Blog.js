import React from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = () => {
    blogService
      .updateLike({
        // title: blog.title,
        // author: blog.author,
        // url: blog.url,
        ...blog,
        likes: blog.likes + 1
      })

    blog.likes++

  }

  const removeBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      blogService
        .removeBlog(blog.id)
    }
  }

  // console.log(`blog in blog.js`, blog)

  return (
    <div style={blogStyle}>
      {blog.title}

      <Togglable
        type="blog"
        // className="togglableBlog"
      >
        <div
        // className="togglableBlog"
        >
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes} <button onClick={updateLike}>like</button>
          </div>
          <div>
            {blog.author}
          </div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog