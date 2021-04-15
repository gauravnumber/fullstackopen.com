require('dotenv').config()
const Phonebook = require('./models/person')

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

morgan.token('type', (request, response) => {
  const body = JSON.stringify(request.body)
  return body
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"))

app.get('/', (request, response) => {
  response.end("Homepage")
})

app.get('/api/persons', (request, response) => {

  Phonebook
    .find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  Phonebook.find({}).then(result => {
    const personNumber = result.length
    const date = new Date()
    response.end(`<p>Phonebook has info for ${personNumber} people</p><p>${date}</p>`)
  })
  // console.log('personNumber', personNumber);

})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook
    .findById(request.params.id)
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))



})
app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook
    .findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  // .catch(error => {
  //   console.log(error.name);
  //   response.status(204).end()
  // })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number can't be empty"
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number
  })

  person.save().then(result => {
    response.json(result)
    console.log(result)
  })
  .catch(error => next(error))
  // .catch(error => {

  //   console.log(error);
  //   // response.status(400).end()
  //   // response.status(400).json({ error: 'id not match'})
  // })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    // ...body,
    name: body.name,
    number: body.number,
  }

  Phonebook
    .findByIdAndUpdate(request.params.id, person, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
})
