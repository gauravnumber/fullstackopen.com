require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')



app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// const password = "passwordoffullstack"

// const url =
//   `mongodb+srv://fullstack:${password}@cluster0.23qc1.mongodb.net/note-app?retryWrites=true&w=majority`

// const url = process.env.MONGODB_URI
// console.log("connecting to", url)

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    // console.log('app.get Note.find({})', notes);
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  const note = notes.find(note => {
    console.log(note.id, typeof note.id, id, typeof id  , note.id === id)
    return note.id === id

  })
  console.log("note inside in get", note)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  

  response.status(204).end()
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(note => note.id))
//     : 0

//   return maxId + 1
// }

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).end({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    // console.log('savedNote', savedNote);
    response.json(savedNote)
    // notes = notes.concat(note)
  })

  // response.json(note)
})

const PORT = process.env.PORT

app.listen(PORT)

console.log(`Server running on port ${PORT}`)