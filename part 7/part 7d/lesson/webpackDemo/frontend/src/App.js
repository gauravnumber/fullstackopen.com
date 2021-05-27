import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
// import "babel-polyfill"

const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])
  return notes
}

const App = () => {
	const [counter, setCounter] = useState(0)
	const [values, setValues] = useState([])
  const url = 'http://localhost:3001/notes'
  // const url = 'https://blooming-atoll-75500.herokuapp.com/api/notes'
  // const notes = useNotes(url)
  const notes = useNotes(BACKEND_URL)

  // const arr = [1, 2, 3]
  // console.log(arr.includes(3));
  
	const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

// console.log('TWO', TWO)


  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
}

export default App