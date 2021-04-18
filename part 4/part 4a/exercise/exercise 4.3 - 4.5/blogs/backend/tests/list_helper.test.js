// const helper = require('../utils/list_helper')

const listHelper = require('../utils/list_helper')


describe('total likes', () => {
  test('of empty list is zero', () => {
    // console.log('likes');
  })

  const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '607bbd1385b83e14b0fef569',
      title: 'wow',
      author: 'wow owner',
      url: 'http://www.url.example.com',
      likes: 12,
      __v: 0
    },
    {
      _id: '607bc12e8d5c77200dd1af34',
      title: 'computer',
      author: 'ner',
      url: 'http://www.url.example.com',
      likes: 3,
      __v: 0
    },
    {
      _id: '607bc12e8d5c77200dd1af34',
      title: 'amazing',
      author: 'ner',
      url: 'http://www.url.example.com',
      likes: 3,
      __v: 0
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(23)
  })

  test('highest likes', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    const mostLiked = { title: 'wow', author: 'wow owner', likes: 12 }

    expect(result).toEqual(mostLiked)
  })

  test('most blogger', () => {
    const result = listHelper.mostBlogs(listOfBlogs)

    console.log('result most blogger', result)
  })

  test('most likes author', () => {
    const result = listHelper.mostLikes(listOfBlogs)

    console.log('result most likes author', result)
  })

})