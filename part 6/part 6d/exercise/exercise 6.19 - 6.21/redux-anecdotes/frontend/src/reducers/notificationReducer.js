const reducer = (state = 'initial notification', action) => {
  console.log('action', action)
  switch (action.type) {
    case 'SHOW_NOTIFICATION': return action.data.notification
    case 'HIDE_NOTIFICATION': return null
    default: return state
  }

}

export const addNotification = (notification, sec) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        notification
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
      // dispatch({
      //   type: 'SHOW_NOTIFICATION',
      //   data: {
      //     notification: null
      //   }
      // })
    }, sec * 1000)
  }
}

// export const addNotification = notification => {
//   return {
//     type: 'SHOW_NOTIFICATION',
//     data: {
//       notification
//     }
//   }
// }

export default reducer