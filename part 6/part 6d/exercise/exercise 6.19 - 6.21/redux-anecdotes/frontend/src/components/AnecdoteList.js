import React from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import {
  addVote,
} from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { addNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  let anecdotes = useSelector(state => {
    if (state.filter === 'EMPTY')
      return state.anecdote

    return state.anecdote.filter(a => a.content.toUpperCase().indexOf(state.filter.toUpperCase()) > -1)
  })

  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(addNotification(`you voted '${content}'`, 10))
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
