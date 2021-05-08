import React from 'react'
// import '../index.css'


export default function Notification ({ message, type }) {
  if (message === null) {
    return null
  }
  console.log('typeof type', typeof type)

  // if (type === "error") {
  // 	return (
  // 		<div className="error">
  // 			{message}
  // 		</div>
  // 	)
  // } else if (type === "added") {
  // 	return (
  // 		<div className="added">
  // 			{message}
  // 		</div>
  // 	)
  // }


  return (
    <div className={type}>
      {message}
    </div>
  )

  // return (
  // 	<div></div>
  // )
}