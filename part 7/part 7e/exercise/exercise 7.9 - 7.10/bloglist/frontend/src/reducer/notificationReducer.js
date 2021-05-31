const reducer = (state = {}, action) => {
  console.log('state', state)
  console.log('action', action)

  switch (action.type) {
  case 'MESSAGE':
    return action.data
    // return { ...action.data, message: action.data.message }
  case 'NOTIFICATION_TYPE':
    return action.data
    // return { ...action.data, notificationType: action.data.notificationType }
  default:
    return state
  }
}

export const setMessage = (message, notificationType) => {
  return {
    type: 'MESSAGE',
    data: {
      message,
      notificationType
    }
  }
}

// export const setMessage = message => {
//   return {
//     type: 'MESSAGE',
//     data: {
//       message
//     }
//   }
// }

// export const setNotificationType = notificationType => {
//   return {
//     type: 'NOTIFICATION',
//     data: {
//       notificationType
//     }
//   }
// }

export default reducer