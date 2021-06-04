const reducer = (state = [], action) => {
  console.log('state', state)
  console.log('action', action)
  if (action.type === 'UPDATE_LIKE') {
    console.log('action.data if action.type is UPDATE_LIKE', action.data)
  }

  switch (action.type) {
  case 'ADD_BLOG': return [...state, action.data]
  // case 'UPDATE_LIKE': return action.data
  case 'REMOVE_BLOG': return [...state.filter(b => b.id !== action.data.id)]
  case 'UPDATE_LIKE': return [...state.filter(b => b.id !== action.data.id), action.data]
  case 'INIT_BLOGS': return action.data
  default: return state
  }
}

export const removeBlogAction = id => {
  return {
    type: 'REMOVE_BLOG',
    data: {
      id
    }
  }
}

export const updateLikeAction = blog => {
  return {
    type: 'UPDATE_LIKE',
    data: blog
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