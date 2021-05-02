import React, { useState } from 'react'

const Togglable = ({
  children,
  index,
  buttonLabel,
  type
}) => {
  const [visible, setVisible] = useState(false)
  const [toggleViewHide, setToggleViewHide] = useState('view')

  const toggleVisible = () => {
    setVisible(!visible)
    setToggleViewHide(toggleViewHide === 'view' ? 'hide' : 'view')
  }


  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  if (type === 'blog') {
    return (
      <>
      {" "}
      {/* {console.log(`index`, index)} */}
        <button
          onClick={toggleVisible}
        >
          {toggleViewHide}
        </button> 
        <div style={showWhenVisible}>
          {children}
        </div>
      </>
    )
  }

  return (
    <div>
      <button
        style={hideWhenVisible}
        onClick={toggleVisible}
      >
        {buttonLabel}
      </button>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable