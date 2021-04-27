const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'new big title blog',
    content: 'new great author name',
    url: 'http://www.url.com',
    likes: 2
  },
  {
    title: 'great like tle blog',
    content: 'great like author name',
    url: 'http://www.url.example.com',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog)
}

const getToken = async () => {
  const user = await User.findOne({ username: 'root' })
  const token = jwt.sign({ username: 'root', id: user.id }, process.env.SECRET)
  return token
}

const getUserId = async () => {
  const user = await User.findOne({ username: 'root' })
  return user.id
}

module.exports = {
  initialBlogs,
  blogsInDb,
  getToken,
  getUserId
}