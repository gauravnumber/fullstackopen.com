import React from 'react'
import {
  Link,
} from 'react-router-dom'
import { Blog as BlogStyle } from './styled-components'

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <BlogStyle>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </BlogStyle>
  )
}

export default Blog