import React from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import {
  updateLikeAction,
  removeBlogAction
} from '../reducer/blogReducer'

import {
// useSelector,
  useDispatch
} from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService
      .updateLike(newBlog)

    blog.likes++

    dispatch(updateLikeAction(newBlog))
  }

  const removeBlog = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      blogService
        .removeBlog(blog.id)
      dispatch(removeBlogAction(blog.id))
    }
  }

  // console.log('blog in blog.js', blog)
  // console.log('typeof blog.id', typeof blog.id)

  return (
    <div style={blogStyle}>
      {blog.title}

      <Togglable
        type="blog"
      >
        <div
          // key={blog.id}
        >
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
            <button
              id="like-button"
              onClick={updateLike}
            >like</button>
          </div>
          <div>
            {blog.author}
          </div>
          <button
            id="remove-button"
            onClick={removeBlog}
          >remove</button>
        </div>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog