import React from 'react'
import { 
  useSelector, 
  useDispatch 
} from 'react-redux'
import { 
  addVote, 
} from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  let anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

    </>
  )
}
