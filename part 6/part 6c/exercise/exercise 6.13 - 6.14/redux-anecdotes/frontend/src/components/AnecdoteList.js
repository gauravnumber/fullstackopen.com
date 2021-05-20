import React, { useEffect } from 'react'
import { 
  useSelector, 
  useDispatch 
} from 'react-redux'
import { 
  addVote, 
  initializeNotes
} from '../reducers/anecdoteReducer'
import Notification from './Notification'
import anecdotesService from '../services/anecdotes'
import { addNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(initializeNotes(anecdotes))
    })
  }, [dispatch])

  let anecdotes = useSelector(state => {
    if (state.filter === 'EMPTY')
      return state.anecdote

    return state.anecdote.filter(a => a.content.toUpperCase().indexOf(state.filter.toUpperCase()) > -1)
  })

  // console.log('typeof anecdotes', typeof anecdotes)

  let filter = useSelector(state => {
    // console.log('state.filter in AnecdoteList.js', state.filter)
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
