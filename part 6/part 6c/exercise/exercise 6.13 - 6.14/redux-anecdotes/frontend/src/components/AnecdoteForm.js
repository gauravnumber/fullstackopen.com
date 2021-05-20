import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteActionCreator } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(addAnecdoteActionCreator(content))
    dispatch(addNotification(`you created '${content}'`))

    const newAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(addAnecdoteActionCreator(newAnecdote))

    setTimeout(() => {
      dispatch(addNotification(''))
    }, 5000)

  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm