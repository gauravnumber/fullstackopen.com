import anecdotesService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_VOTE': {
      const anecdote = state.find(a => a.id === action.data.id)
      anecdote.votes++
      return [...state.filter(a => a.id !== action.data.id), anecdote]
    } 
    case 'ADD_ANECDOTE': {
      const anecdote = {
        ...action.data,
        // id: getId(),
        votes: 0
      }
      return [...state, anecdote] 
    } 
    case 'INIT_ANECDOTES': return action.data
    default: return state
  }
}

export const addVote = id => {
  return async dispatch => {
    await anecdotesService.addVote(id)

    dispatch({
      type: 'ADD_VOTE',
      data: { id }
    })
  }
}

// export const addVote = id => {
//   return {
//     type: 'ADD_VOTE',
//     data: { id }
//   }
// }

export const addAnecdoteActionCreator = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createAnecdote(content)
    
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

// export const addAnecdoteActionCreator = anecdote => {
//   return {
//     type: 'ADD_ANECDOTE',
//     data: anecdote
//   }
// }

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}
// export const initializeNotes = anecdotes => {
//   return {
//     type: 'INIT_ANECDOTES',
//     data: anecdotes
//   }
// }

export default reducer