import React from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li
            key={note.id} 
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App

// import { createStore } from 'redux'

// function App() {
//   const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1
//       case 'DECREMENT':
//         return state - 1
//       case 'ZERO':
//         return 0
//       default: // if none of the above matches, code comes here
//         return state
//     }
//   }

//   const store = createStore(counterReducer)
//   store.subscribe(() => {
//     const storeNow = store.getState()
//     console.log(storeNow)
//   })

//   // console.log(store.getState())
//   store.dispatch({ type: 'INCREMENT' })
//   store.dispatch({ type: 'INCREMENT' })
//   store.dispatch({ type: 'INCREMENT' })
//   // console.log(store.getState())
//   store.dispatch({ type: 'ZERO' })
//   store.dispatch({ type: 'DECREMENT' })
//   // console.log(store.getState())

//   return (
//     <div>
//       <h1>counter</h1>
//     </div>
//   )
// }

// export default App;
