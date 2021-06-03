import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { userStoreAction } from '../reducer/userReducer'
// import blogService from '../services/blogs'
// import { initializeBlogs } from '../reducer/blogReducer'

export default function BlogsDetailsHeader() {
  // const user = useSelector(state => state.user)
  // const dispatch = useDispatch()

  return (
    <div><h2>blogs</h2>
      {/* <div>
        {user.name} logged in
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
      </div> */}
    </div>
  )
}
