import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = () => {
  const [filter, setFilter] = useState('')
  const anecdote = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  console.log('anecdote in Filter.js', anecdote)

  const handleChange = (event) => {
    setFilter(event.target.value)
    dispatch(addFilter(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter 
      <input 
        value={filter}
        onChange={handleChange} 
      />
    </div>
  )
}

export default Filter