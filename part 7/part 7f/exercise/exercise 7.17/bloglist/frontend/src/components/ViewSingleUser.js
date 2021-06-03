import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import { useRouteMatch } from 'react-router-dom'

export default function ViewSingleUser() {
  const [user, setUser] = useState(null)
  const match = useRouteMatch('/users/:id')
  const id = match ? match.params.id : null

  useEffect(() => {
    userService
      .singleUser(id)
      .then(response => {
        setUser(response)
      })
      .catch(error => console.log(error))
  }, [id])

  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}
