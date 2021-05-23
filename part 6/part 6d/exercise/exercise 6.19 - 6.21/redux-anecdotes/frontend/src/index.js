import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
// import { createStore, combineReducers } from 'redux'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const reducer = combineReducers({
//   anecdote: anecdoteReducer,
//   notification: notificationReducer,
//   filter: filterReducer
// })

// const store = createStore(
//   reducer,
//   composeWithDevTools()
// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)