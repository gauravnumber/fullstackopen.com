const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')

userRouter.get('/', async (request, response) => {
  const result = await User
    .find({})
  // .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(result)
})

userRouter.get('/:id', async (request, response) => {
  // let t = []
  const user = await User
    .findById(request.params.id)

  // async function asyncFunction(blogId, index) {
  //   const blog = await Blog
  //     .findById(blogId)

  //   if (blog !== null) {
  //     t = t.concat(user.blogs[index].toString())
  //   }
  //   return t
  // }

  // user.blogs.forEach(async (blogId, index, array) => {
  //   let temp = await asyncFunction(blogId, index)
  //   if (array.length === index + 1) {
  //     await User.findByIdAndUpdate("608293d7e8f7a6194c290769", { "blogs": temp }, {new: true})
  //     console.log(`temp in callback`, temp)
  //     console.log('asyncFunction complete');
  //   }
  // })

  response.json(user)
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