import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response))
      })


    // axios
    //   .put(url, changedNote)
    //   .then(res => {
    //     console.log('res.data', res.data)
    //     setNotes(notes.map(note => note.id !== id ? note : res.data))
    //   })
    console.log('importance of ' + id + ' needs to be toggled')
  }


  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(noteObject))
        setNewNote("")
      })

  //   axios
  //     .post('http://localhost:3001/notes', noteObject)
  //     .then(response => {
  //       // console.log(response)
  //       setNotes(notes.concat(noteObject))
  //       setNewNote('')
  //     })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  useEffect(() => {
    // axios
    //   .get(`http://localhost:3001/notes`)
    //   .then(response => {
    //     setNotes(response.data)
    //   })

    noteService
      .getAll()
      .then(response => setNotes(response))
  }, [])



  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type="submit">save</button>
      </form>
    </div>
    )

}

export default App