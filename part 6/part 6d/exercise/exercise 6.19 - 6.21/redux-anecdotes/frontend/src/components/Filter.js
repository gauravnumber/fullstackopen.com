import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const [filter, setFilter] = useState('')
  const handleChange = (event) => {
    setFilter(event.target.value)
    props.addFilter(event.target.value)
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

const mapDispatchToProps = dispatch => {
  return {
    addFilter: value => {
      dispatch(addFilter(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
