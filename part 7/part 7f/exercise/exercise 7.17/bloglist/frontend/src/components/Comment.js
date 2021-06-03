import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useRouteMatch } from 'react-router-dom'

export default function Comment() {
  const [comment, setComment] = useState(null)

  const match = useRouteMatch('/blogs/:id')
  const id = match ? match.params.id : null

  useEffect(() => {
    blogService
      .viewComment(id)
      .then(response => setComment(response.comment))
  }, [id])

  console.log('id', id)
  // console.log('comment', comment)

  return (
    <div>
      <h2>comments</h2>
      <ul>
        {comment && comment.map((c, i) => <li key={i}>{c}</li>)}
        {/* <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li> */}
      </ul>
    </div>
  )
}
