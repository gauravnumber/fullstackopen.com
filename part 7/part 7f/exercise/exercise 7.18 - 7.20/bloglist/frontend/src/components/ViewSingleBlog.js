import React, {
// useState,
// useEffect
} from 'react'
import { useRouteMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateLikeAction,
} from '../reducer/blogReducer'

export default function ViewSingleBlog() {
  // const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const id = match ? match.params.id : null

  const blog = useSelector(state => state.blog.find(b => b.id === id))
  // console.log('blog1', blog1)
  // console.log('blogService.viewSingleBlog(id)', blogService.viewSingleBlog(id))
  // useEffect(() => {
  //   blogService
  //     .viewSingleBlog(id)
  //     .then(response => {
  //       setBlog(response)
  //       console.log('response', response)
  //     })
  // }, [id])

  if (!blog) return null

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

  return (
    <div>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes<button onClick={updateLike}>like</button></div>
      <div>
        added by {blog.author}
      </div>
    </div>
  )
}
