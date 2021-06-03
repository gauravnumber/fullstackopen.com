const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const middleware = require('../utils/middleware')
// const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log('blog', blog)
  
  // if (blog === null) {
  //   console.log(`typeof blog`, typeof blog, 'blog', blog)
  //   console.log(`wowow`)    
  // }

  response.status(201).json(blog)
})

blogsRouter.get('/:id/comment', async (request, response) => {
  const id = request.params.id
  let blog = await Blog.findById(id)


  console.log('blog', blog)
  response.status(201).json(blog)
})

blogsRouter.post('/:id/comment', async (request, response) => {
  let body = request.body
  if (!body.comment) return response.status(201).end()

  const id = request.params.id
  let blog = await Blog.findById(id)

  let comment = blog.comment.concat(body.comment)
  comment = {comment: [...comment]}

  blog = await Blog.findByIdAndUpdate(id, comment, { new: true })

  console.log('blog', blog)
  console.log('comment', comment)
  response.status(201).json(comment)
})

// blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
blogsRouter.post('/', async (request, response) => {
  let body = request.body
  // const body = request.body

  // console.log('decodedToken', decodedToken)
  console.log('request.body', request.body)
  // console.log('request.token', request.token)
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken || !request.token) {
  //   response.status(401).json({ error: 'token missing or invalid' })
  // }

  if (!body.title || !body.author) {
    return response.status(400).json({ error: 'author or title name missing' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.comment) {
    body.comment = []
  }

  
  body.userId = request.user
  
  console.log(`request.user`, request.user)

  const user = await User.findById(body.userId)

  const blog = new Blog({
    ...body,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)


  // if (decodedToken.id.toString() === blog.user.toString()) {
  // console.log(`user`, user)
  // console.log(`blog`, blog)
  // console.log(`request.body`, request.body)

  console.log('[backend] id', id)
  console.log(`[backend] request.user`, request.user)
  console.log('[backend] blog', blog)
  console.log(`[backend] blog.user`, blog.user)


  if (request.user.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  }

  response.status(401).json({ error: 'you are not authorize' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const newBlog = {
    // ...body,
    likes: body.likes
  }
  
  const blog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })

  response.status(204).json(blog)
})

module.exports = blogsRouter