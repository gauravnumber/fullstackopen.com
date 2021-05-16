import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    state.push(action.data)
    return state
  }

  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }

// const store = createStore(counterReducer)

// const App = () => {
//   return (
//     <div>
//       <div>
//         {store.getState()}
//       </div>
//       <button 
//         onClick={e => store.dispatch({ type: 'INCREMENT' })}
//       >
//         plus
//       </button>
//       <button
//         onClick={e => store.dispatch({ type: 'DECREMENT' })}
//       >
//         minus
//       </button>
//       <button 
//         onClick={e => store.dispatch({ type: 'ZERO' })}
//       >
//         zero
//       </button>
//     </div>
//   )
// }

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

