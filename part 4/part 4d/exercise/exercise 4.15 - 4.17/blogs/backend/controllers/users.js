const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const result = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(result)
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = await User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  // user
  //   .save()
  //   .then(savedUser => response.status(201).json(savedUser))
  //   .catch(error => response.status(404).json({ error: 'idk' }))

  const savedUser = await user.save()
  response.json(savedUser)
  // response.status(201).json(savedUser)

})
module.exports = userRouter