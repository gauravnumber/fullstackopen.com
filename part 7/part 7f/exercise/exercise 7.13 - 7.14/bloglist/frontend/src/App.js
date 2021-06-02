import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogsDetailsHeader from './components/BlogsDetailsHeader'
import BlogsDetails from './components/BlogsDetails'
import UsersDetails from './components/UsersDetails'
import ViewSingleUser from './components/ViewSingleUser'
import './index.css'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducer/blogReducer'
import { userStoreAction } from './reducer/userReducer'
import {
  Switch,
  Route,
  // useRouteMatch,
} from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // const match = useRouteMatch('/users/:id')
  // const id = match ? match.params.id : null
  // const singleUserBlog = match ? match.params.id : null

  // console.log('match.params.id', match.params.id)

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
      <Notification />
      {user && <BlogsDetailsHeader />}

      <Switch>
        <Route path="/users/:id">
          <ViewSingleUser />
          {/* <ViewSingleUser id={id} /> */}
        </Route>
        <Route path="/users">
          {user &&
            <div>
              {/* <BlogsDetailsHeader /> */}
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