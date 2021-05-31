const reducer = (state = [], action) => {
  console.log('state', state)
  console.log('action', action)

  switch (action.type) {
  case 'ADD_BLOG': return [...state, action.data]
  case 'INIT_BLOGS': return action.data
  default: return state
  }
}

export const addBlog = blog => {
  return {
    type: 'ADD_BLOG',
    data: blog
  }
}

export const initializeBlogs = blogs => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}
export default reducer