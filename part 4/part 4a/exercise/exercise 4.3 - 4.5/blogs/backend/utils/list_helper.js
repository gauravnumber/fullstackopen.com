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
  const arrBlogName = blogs.map(blog => blog.author)

  return arrBlogName
}

const mostLikes = blogs => {
  const arrBlogLikes = blogs.map(blog => blog.likes)

  return arrBlogLikes
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}