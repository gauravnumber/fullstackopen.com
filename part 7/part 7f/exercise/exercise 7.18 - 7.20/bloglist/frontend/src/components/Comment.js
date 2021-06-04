import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Comment() {
  const [comment, setComment] = useState(null)
  const [commentValue, setCommentValue] = useState('')
  const user = useSelector(state => state.user)

  const match = useRouteMatch('/blogs/:id')
  const id = match ? match.params.id : null

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }

    blogService
      .viewComment(id)
      .then(response => {
        // console.log('response.comment', response.comment)
        setComment(response.comment)
      })
      .catch(error => console.log(error))
  }, [id, user])

  // console.log('id', id)
  // console.log('comment', comment)
  // console.log('user', user)
  // console.log('comment', comment)

  if (!comment) return null

  const handleCommentValue = e => {
    e.preventDefault()
    blogService
      .addComment(id, commentValue)
      .then(response => {
        setComment(response.comment)
        // console.log('response', response.comment)
      })
    setCommentValue('')
  }

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={handleCommentValue}>
        <input
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {comment.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  )
}
