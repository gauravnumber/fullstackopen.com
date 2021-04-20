const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  // .then(blogs => {
  //   response.json(blogs)
  // })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!body.title || !body.author) {
    return response.status(400).json({ error: 'author or title name missing'})
  }
  
  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog(body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

  // const blog = new Blog(request.body)

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
})

module.exports = blogsRouter