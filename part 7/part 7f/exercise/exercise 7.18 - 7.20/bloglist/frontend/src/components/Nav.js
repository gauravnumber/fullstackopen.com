import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userStoreAction } from '../reducer/userReducer'
import blogService from '../services/blogs'
import { initializeBlogs } from '../reducer/blogReducer'
import { Link } from 'react-router-dom'
import {  Navigation, Item } from './styled-components'

// console.log('Navigation', Navigation)

export default function Nav() {
  // const style = {
  //   listStyleType: 'none',
  //   padding: '0',
  //   margin: '0',
  // }

  // const styleLi = {
  //   display: 'inline',
  //   marginRight: '8px'
  // }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!user) return null

  return (
    <div>
      <Navigation>
        <Item>
          <Link to="/blogs">
            blogs
          </Link>
        </Item>
        <Item>
          <Link to="/users">
            users
          </Link>
        </Item>
        <Item>{user.name} logged in</Item>
        <Item>
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
        </Item>
      </Navigation>
    </div>
  )
}
