// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

// const noteReducer = (state = initialState, action) => {
const noteReducer = (state = [], action) => {
  console.log('state in noteReducer', state)
  console.log('action in noteReducer', action)

  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
      // return state.concat(action.data)
    case 'INIT_NOTES': 
      console.log('action.data', action.data)
      return action.data
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
    }

    default:
      return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  }
}

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes,
  }
}

export default noteReducer