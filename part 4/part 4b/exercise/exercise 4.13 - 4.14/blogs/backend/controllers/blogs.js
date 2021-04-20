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
    return response.status(400).json({ error: 'author or title name missing' })
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

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const newBlog = {
    ...body,
    likes: body.likes
  }

  // console.log('body', body);
  // console.log('newBlog', newBlog)
  // console.log('likes', body.likes)

  const blog = await Blog.findByIdAndUpdate(id, newBlog, { new: true })
  // response.json(blog)
  
  response.status(204).json(blog)
})

module.exports = blogsRouter