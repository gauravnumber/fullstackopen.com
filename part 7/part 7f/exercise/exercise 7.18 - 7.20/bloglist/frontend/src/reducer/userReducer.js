const reducer = (state = null, action) => {
  console.log('state', state)
  console.log('action', action)

  switch (action.type) {
  case 'USER_STORE': return action.data
  default: return state
  }
}

export const userStoreAction = user => {
  return {
    type: 'USER_STORE',
    data: user
  }
}

export default reducer