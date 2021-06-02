import React, { useState, useEffect } from 'react'
import usersDetails from '../services/users'
import {
  Link
} from 'react-router-dom'

export default function UsersDetails() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    usersDetails
      .getAll()
      .then(response => {
        setUsers(response.map(b => (
          <tr key={b.id}>
            <td>
              <Link to={`/users/${b.id}`}>
                {b.name}
              </Link>
            </td>
            <td>
              {b.blogs.length}
            </td>
          </tr>
        )))
      })
  })

  const table = (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users}
      </tbody>
    </table>
  )

  return (
    <div>
      <h1>Users</h1>
      {table}
    </div>
  )
}
