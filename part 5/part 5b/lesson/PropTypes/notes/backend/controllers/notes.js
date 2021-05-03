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
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  console.log(`request.user`, request.user)
  const token = getTokenFrom(request)
  // const toke

  // console.log('process.env.SECRET', process.env.SECRET);
  
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }


  body.userId = request.user
  const user = await User.findById(body.userId)

  

  console.log(`body.userId`, body.userId)
  console.log(`user in notesRouter`, user)

  const note = new Note({
    content: body.content,
    // important: body.important || false,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

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
