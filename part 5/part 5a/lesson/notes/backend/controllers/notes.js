const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  console.log('authorization', authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  //TODO: Temporary commenting authentication
  // const token = getTokenFrom(request)

  // console.log('token', token)
  // console.log('process.env.SECRET', process.env.SECRET);

  // const decodedToken = jwt.verify(token, process.env.SECRET)

  // console.log('decodedToken', decodedToken)

  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }

  console.log('body', body)
  const user = await User.findById(body.userId)
  console.log('user', user)

  // console.log('decodedToken', decodedToken)


  const note = new Note({
    content: body.content,
    // important: body.important || false,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    // user: user._id
  })

  console.log('note', note)

  const savedNote = await note.save()

  console.log('savedNote', savedNote)

  // TODO: uncomment
  // user.notes = user.notes.concat(savedNote._id)
  // await user.save()

  response.json(savedNote)
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter
