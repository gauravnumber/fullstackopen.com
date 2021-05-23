import React from 'react'
import { connect } from 'react-redux'

import { addAnecdoteActionCreator } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.addAnecdoteActionCreator(content)
    props.addNotification(`you created '${content}'`, 10)
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

const mapDispatchToProps = dispatch => {
  return {
    addAnecdoteActionCreator: value => {
      dispatch(addAnecdoteActionCreator(value))
    },
    addNotification: value => {
      dispatch(addNotification(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
