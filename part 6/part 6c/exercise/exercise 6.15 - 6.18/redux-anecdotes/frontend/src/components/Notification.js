import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    // console.log('state in Notification.js', state)
    console.log('state.notification', state.notification)
    // console.log('state', state)
    return state.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: (notification === null? 'none': '')
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification