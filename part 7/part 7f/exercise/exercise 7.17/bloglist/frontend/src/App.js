import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogsDetailsHeader from './components/BlogsDetailsHeader'
import BlogsDetails from './components/BlogsDetails'
import UsersDetails from './components/UsersDetails'
import ViewSingleUser from './components/ViewSingleUser'
import ViewSingleBlog from './components/ViewSingleBlog'
import Nav from './components/Nav'
import Comment from './components/Comment'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducer/blogReducer'
import { userStoreAction } from './reducer/userReducer'
import {
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log('state', state)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userStoreAction(user))
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        dispatch(initializeBlogs(blogs))
      })

      console.log('user in useEffect', user)
    }
  }, [dispatch])

  return (
    <div>
      <Nav />
      <Notification />
      {user && <BlogsDetailsHeader />}

      <Switch>
        {/* <Route path="/blogs/:id/comment">
          <Comment />
        </Route> */}
        <Route path="/blogs/:id">
          <div>
            <ViewSingleBlog />
            <Comment />
          </div>
        </Route>
        <Route path="/users/:id">
          <ViewSingleUser />
        </Route>
        <Route path="/users">
          {user &&
            <div>
              <UsersDetails />
            </div>
          }
        </Route>

        <Route path="/">
          {user === null ?
            <Login /> :
            <BlogsDetails />
          }
        </Route>

      </Switch>
    </div>
  )
}

export default App