import React from 'react'
import { connect } from 'react-redux'
// import { useSelector } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => {
  //   // console.log('state in Notification.js', state)
  //   console.log('state.notification', state.notification)
  //   // console.log('state', state)
  //   return state.notification
  // })

  console.log('props', props)
  // console.log('typeof props', typeof props)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: (props.notification === null? 'none': '')
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    notification: state.notification 
  }
}

export default connect(
  mapStateToProps
)(Notification)
// export default Notification