import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { useSelector } from 'react-redux'

const reducer = combineReducers({
  notification: notificationReducer,
  blog: blogReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)
// const state = useSelector( state => state)
// console.log('state', state)

export default store