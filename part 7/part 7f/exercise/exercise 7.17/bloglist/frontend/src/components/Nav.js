import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStoreAction } from '../reducer/userReducer'
import blogService from '../services/blogs'
import { initializeBlogs } from '../reducer/blogReducer'
import { Link } from 'react-router-dom'

export default function Nav() {
  const style = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  }

  const styleLi = {
    display: 'inline',
    marginRight: '8px'
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <div>
      <ul style={style}>
        <li style={styleLi}>
          <Link to="/blogs">
            blogs
          </Link>
        </li>
        <li style={styleLi}>
          <Link to="/users">
            users
          </Link>
        </li>
        <li style={styleLi}>{user.name} logged in</li>
        <li style={styleLi}>
          <button
            id="logout-button"
            onClick={() => {
              window.localStorage.clear()
              dispatch(userStoreAction(''))
              blogService.setToken = null
              dispatch(initializeBlogs([]))
            }}>
            logout
          </button>
        </li>
      </ul>
    </div>
  )
}
