const _ = require('lodash')

const totalLikes = blogs => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = blogs => {
  let mostLiked = 0
  let mostLikedId
  blogs.forEach(item => {
    if (item.likes > mostLiked) {
      mostLiked = item.likes
      mostLikedId = item._id
    }
  })

  const blog = blogs.find(blog => blog._id === mostLikedId)

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }
}

const mostBlogs = blogs => {
  // const arrBlogName = blogs.map(blog => blog.author)
  let mostValue = 0
  let mostAuthor

  let mostAuthorList =
    _.chain(blogs)
      .countBy('author')
      .value()


  for (let key in mostAuthorList) {
    if (mostAuthorList[key] > mostValue) {
      mostValue = mostAuthorList[key]
      mostAuthor = key
    }
  }
  // console.log('mostValue ', mostValue);
  // console.log('mostAuthor ', mostAuthor);


  return {
    author: mostAuthor,
    blogs: mostValue
  }
}

const mostLikes = blogs => {
  // const arrBlogLikes = blogs.map(blog => blog.likes)
  let mostLiked = 0
  let totalNumberOfLikes = 0
  let mostLikedAuthor

  blogs.forEach(blog => {
    if (blog.likes > mostLiked) {
      mostLiked = blog.likes
      mostLikedAuthor = blog.author
      // console.log('mostLikedAuthor', mostLikedAuthor);
    }
  })


  // let totalNumberOfLikes = blogs.reduce((sum, item) => {
  //   if (item.author === mostLikedAuthor) {
  //     console.log('item.likes', item.likes);
  //     console.log('sum', sum);
  //     return sum + item.likes
  //   }
  // }, 0)

  blogs.forEach(blog => {
    if (blog.author === mostLikedAuthor) {
      totalNumberOfLikes += blog.likes
    }
  })

  // console.log('totalNumberOfLikes', totalNumberOfLikes);


  return {
    author: mostLikedAuthor,
    likes: totalNumberOfLikes
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}