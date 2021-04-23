const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  console.log('userRouter');
  const result = await User.find({})
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

  const savedUser = await user.save()
  response.status(201).json(savedUser)

})
module.exports = userRouter