// const reducer = (state = null, action) => {
const reducer = (state = 'initial notification', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': return action.data.notification
    // case ''
    default: return state
  }

}

export const addNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      notification
    }
  }
}

export default reducer