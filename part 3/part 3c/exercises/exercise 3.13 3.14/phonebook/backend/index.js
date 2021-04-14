require('dotenv').config()
const Phonebook = require('./models/person')
// const Person = require('./models/person')
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

console.log('Phonebook', Phonebook)
// Phonebook.find({}).then(result => {
// 	console.log(result)

// })

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :type"))

// let persons = [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "87847384783"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     },
//     {
//       "id": 5,
//       "name": "gaurav",
//       "number": "989898"
//     }
//   ]

app.get('/', (request, response) => {
    response.end("Homepage")
})

app.get('/api/persons', (request, response) => {
	// Person
	Phonebook
		.find({})
		.then(persons => {
      // console.log(persons);
      response.json(persons)
      // mongoose.connection.close()
		})
    // response.json(persons)
})

app.get('/info', (request, response) => {
    const personNumber = persons.length
    const date = new Date()
    response.end(`<p>Phonebook has info for ${personNumber} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	Phonebook
		.findById(request.params.id)
		.then(result => {
			response.json(result)
		})
    // const id = Number(request.params.id)

    // const person = persons.find(person => person.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})

app.post('/api/persons', (request, response) => {
  const body = request.body
  // const randomNumber = Math.floor( Math.random() * 100000)

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number can't be empty"
    })

    // response.status(400).end()
  }


  // const isNameExist = persons.some(person => person.name === body.name)
  // console.log('isNameExist', isNameExist);
  // if (isNameExist) {
  //   return response.status(400).json({
  //     error: "Person name already exist."
  //   })
  // }

  const person = new Phonebook({
    // id: randomNumber,
    name: body.name,
    number: body.number
  })

  person.save().then(result => {
    console.log(result)
  })

  // persons = persons.concat(person)

  // response.json(persons)
  // console.log(person);
})

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
})
