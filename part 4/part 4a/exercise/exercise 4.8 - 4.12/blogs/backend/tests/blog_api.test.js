const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'garuav',
    content: 'gaurav',
    url: 'http://www.gaurav.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = await response.body.map(b => b.title)
  expect(titles).toContain(
    newBlog.title
  )
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('all blogs', async () => {
  const response = await api.get('/api/blogs/')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('likes property is here', async () => {
  const newBlog = {
    author: 'author name',
    title: 'newBlog in likes property is here',
    content: 'gaurav',
    url: 'http://www.gaurav.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect((res) => {
      expect(res.body.likes).toEqual(0)
      // expect(res.body.likes).not.toBeDefined()
    })

  const response = await api.get('/api/blogs')

  console.log('response.body', response.body);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('endpoint blog', async () => {
  const newBlog = {
    url: 'http://www.gaurav.com',
    likes: 34
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})