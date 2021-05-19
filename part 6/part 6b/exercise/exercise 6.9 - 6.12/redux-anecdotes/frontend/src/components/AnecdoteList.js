import React from 'react'
import { 
  useSelector, 
  useDispatch 
} from 'react-redux'
import { 
  addVote, 
} from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

export default function AnecdoteList() {
  // let anecdotes = useSelector(state => state.anecdote)
  let anecdotes = useSelector(state => {
    if (state.filter === 'EMPTY')
      return state.anecdote

    return state.anecdote.filter(a => a.content.toUpperCase().indexOf(state.filter.toUpperCase()) > -1)
  })

  console.log('typeof anecdotes', typeof anecdotes)

  const dispatch = useDispatch()
  let filter = useSelector(state => {
    console.log('state.filter in AnecdoteList.js', state.filter)
  })

  console.log('filter outside', filter)
  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(addNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(addNotification(null))
    }, 5000)
  }

  return (
    <>
    <Notification />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}

    </>
  )
}
