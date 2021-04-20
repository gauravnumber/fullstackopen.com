const Blog = require('../models/blog')

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
  return blogs.map(blog => blog.toJSON)
}

module.exports = {
  initialBlogs,
  blogsInDb
}