import React from 'react'
// import '../index.css'


export default function Notification ({ message }) {
  if (message === null) {
    return null
  }

  console.log('typeof type', typeof type)

  return (
    <div className="error">
      {message}
    </div>
  )
}