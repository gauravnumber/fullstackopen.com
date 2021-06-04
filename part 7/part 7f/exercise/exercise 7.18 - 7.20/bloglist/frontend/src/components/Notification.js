import React from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'

export default function Notification() {
  const { message, notificationType } = useSelector(state => state.notification)

  if (message === null) {
    return <div />
  }

  return (
    <div className={notificationType}>
      {message}
    </div>
  )

}

// Notification.propTypes = {
//   message: PropTypes.string,
//   type: PropTypes.string
// }