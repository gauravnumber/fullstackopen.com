require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')


app.use(express.static('build'))
app.use(express.json())
// app.use(cors())



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    
    response.json(notes)
  })
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    console.log('errorHandler wow');
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)

app.get('/api/notes/:id', (request, response, next) => {
  
  Note
  .findById(request.params.id)
  .then(note => {
    console.log(note);
    // response.status(200).end()
    if (note) {
        response.json(note)
        
      } else {
        console.log('find unknown');
        response.status(404).end()
        
      }
    })
    // .catch(error => next(error))
    .catch(error => {
        console.log(error);
        console.log('error.name', error.name);
        response.status(400).json({ error: 'Malformatted id' })
      })
      
      
      

      

    })
      

    app.delete('/api/notes/:id', (request, response, next) => {
      Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      // .catch(error => next(error))
      .catch(error => {
        console.log(error)
        response.status(400).json({ error: 'Bad Request'})
      })

      // const id = Number(request.params.id)
      // notes = notes.filter(note => note.id !== id)
      // response.status(204).end()
    })
    
    
    
    
    
    
    
    
    
    app.post('/api/notes', (request, response) => {
      const body = request.body
      
      if (!body.content) {
        return response.status(400).json({
          error: "content missing"
        })
      }
      
      const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
      })
      
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    // .catch(error => next(error))
    .catch(error => {
      response.status(400).json({error: 'No note find'})
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)