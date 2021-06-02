const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  // const password = 'password'
  // const passwordHash = await bcrypt.hash(password, 10)

  await User.deleteMany({})
  const user = await User({
    username: 'root',
    // passwordHash
  })

  await user.save()
})


describe('initial blogs saved', () => {
  // beforeEach(async () => {
  //   const user = await User.findOne({ username: 'root' })
  //   console.log(`user.id`, user.id)

  //   const token = jwt.sign({ username: 'root', id: user.id }, process.env.SECRET)
  //   console.log(`token`, token)
  // })


  test('blogs are returned as json', async () => {
    const user = await User.findOne({ username: 'root' })
    // const token = jwt.sign({ username: 'root', id: user.id }, process.env.SECRET)
    const token = await helper.getToken()
    console.log('token in /GET', token)
    
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('likes property is here', async () => {

    // const user = await User.findOne({ username: 'root' })
    // console.log(`user.id`, user.id)


    // console.log(`token`, token)

    const user = await User.findOne({ username: 'root' })
    const token = jwt.sign({ username: 'root', id: user.id }, process.env.SECRET)
    // console.log(`user.id`, user.id)

    const newBlog = {
      author: 'author name',
      title: 'newBlog in likes property is here',
      content: 'gaurav',
      url: 'http://www.gaurav.com',
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    // .expect((res) => {
    //   expect(res.body.likes).toEqual(0)
    //   // expect(res.body.likes).not.toBeDefined()
    // })

    const response = await
      api
        .get('/api/blogs')
        .set('Authorization', `bearer ${token}`)
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

})

describe('view blogs', () => {
  test('all blogs', async () => {
    // console.log(`helper.userTokerVerify`, await helper.userTokenVerify())
    // console.log(`request.user`, request.user)

    const response = await api
      .get('/api/blogs/')
      // .set('Authorization', `bearer ${helper.userTokenVerify()}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdiIsImlkIjoiNjA4MjkzZDdlOGY3YTYxOTRjMjkwNzY5IiwiaWF0IjoxNjE5MjY2MTIwfQ.kVMxKfClG_7TNit7f7t4oVI919c4OaeZPX0eUJUEhnw')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('addition of a new blog', () => {
  test('blog can be added', async () => {
    const userId = await helper.getUserId()

    const newBlog = {
      title: 'garuav',
      author: 'gaurav',
      url: 'http://www.gaurav.com',
      likes: 2,
      user: userId
    }

    const token = await helper.getToken()
    console.log(`userId`, userId)
    console.log(`token in test`, token)

    await api
      .post('/api/blogs')
      .send(newBlog)
      // .set('Authorization', `bearer ${token}`)
      .set({ Authorization: `bearer ${token}` })
      // .set({ Authorization: `${token}` })
      // .expect(201)
      // .end((err, res) => {
      // const newCategory = res.body;
      // console.log(`newCategory`, newCategory)

      // expect(res.status).equal(200);
      // expect(newCategory).to.be.equal(category);

      // done();
      // })
      // .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdiIsImlkIjoiNjA4MjkzZDdlOGY3YTYxOTRjMjkwNzY5IiwiaWF0IjoxNjE5MjY2MTIwfQ.kVMxKfClG_7TNit7f7t4oVI919c4OaeZPX0eUJUEhnw')
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set({ Authorization: `bearer ${token}` })

    console.log(`response.body`, response.body)
    const titles = await response.body.map(b => b.title)
    expect(titles).toContain(
      newBlog.title
    )
    // expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('deletion of a blog', () => {
  test('delete a blog', async () => {
    const userId = await helper.getUserId()

    const newBlog = {
      author: 'author name',
      title: 'newBlog in likes property is here',
      url: 'http://www.gaurav.com',
      likes: 11,
      user: userId
    }

    const token = await helper.getToken()
    // console.log('token inside delete blog', token)
    // console.log(`bearer ${token}`);

    const blog = new Blog(newBlog)
    await blog.save()
    // await blog.remove()
    const id = blog._id
    // expect(blog.id).toBeDefined()

    console.log('blog in delete', blog)
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204)
  })

})

describe('updating blog', () => {
  test('updating likes', async () => {
    const newBlog = {
      author: 'author name',
      title: 'newBlog in likes property is here',
      url: 'http://www.gaurav.com',
      likes: 11
    }

    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdiIsImlkIjoiNjA4MjkzZDdlOGY3YTYxOTRjMjkwNzY5IiwiaWF0IjoxNjE5MjY2MTIwfQ.kVMxKfClG_7TNit7f7t4oVI919c4OaeZPX0eUJUEhnw')
      .send(newBlog)
      .expect(204)
  })
})


afterAll(() => {
  mongoose.connection.close()
})