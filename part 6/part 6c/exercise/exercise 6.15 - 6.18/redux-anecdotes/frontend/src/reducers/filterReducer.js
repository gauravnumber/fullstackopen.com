const reducer = (state = 'EMPTY', action) => {
  switch (action.type) {
    case 'FILTER': return action.data.filter
    default: return state
  }
}

export const addFilter = filter => {
  return {
    type: 'FILTER',
    data: {
      filter
    }
  }
}

export default reducer