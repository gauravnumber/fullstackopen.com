import React, { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
// import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      noteService
        .getAll()
        .then(response => setNotes(response))
    }

  }, [])

  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes/${id}`

    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log('note', note)
    console.log('changedNote', changedNote)

    noteService
      .update(id, changedNote)
      .then(response => {
        console.log('notes.map', notes.map(note => note.id !== id ? note : response))
        setNotes(notes.map(note => note.id !== id ? note : response))
      })
      .catch(error => {
        console.log('Something wrong happened in toggleImportanceOf()', error)
      })


    // axios
    //   .put(url, changedNote)
    //   .then(res => {
    //     console.log('res.data', res.data)
    //     setNotes(notes.map(note => note.id !== id ? note : res.data))
    //   })
    console.log('importance of ' + id + ' needs to be toggled')
  }


  const addNote = (noteObject) => {
    // noteFormRef.current.toggleVisiblity()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)

      noteService
        .getAll()
        .then(response => setNotes(response))

      console.log('user setUser', user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logged in with', username, password)
  }


  const noteForm = () => (
    <Togglable
      buttonLabel="new note"
      ref={noteFormRef}
    >
      <NoteForm createNote={addNote} />
    </Togglable>
  )



  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {console.log('user', user)}

      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
        :
        <div>
          <p>{user.username} logged-in</p>
          {noteForm()}
        </div>
      }

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
    </div>
  )

}

export default App