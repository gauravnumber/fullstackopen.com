import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({
  // index,
  children,
  buttonLabel,
  type
}) => {
  const [visible, setVisible] = useState(false)
  const [toggleViewHide, setToggleViewHide] = useState('view')

  const toggleVisible = () => {
    setVisible(!visible)
    setToggleViewHide(toggleViewHide === 'view' ? 'hide' : 'view')
  }

  // console.log(`typeof children`, typeof children)
  // console.log(`children`, children)



  const hideWhenVisible = {
    display: visible ? 'none' : ''
  }

  const showWhenVisible = {
    display: visible ? '' : 'none'
  }

  if (type === 'blog') {
    return (
      <div
      >
        {' '}
        <button
          id="toggleViewHide-button"
          onClick={toggleVisible}
        >
          {toggleViewHide}
        </button>
        <div
          style={showWhenVisible}
          className="togglableContent"
        >
          {children}
        </div>
      </div>
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

      <div
        style={showWhenVisible}
        // className="togglableContent"
        // id="toggle"
      >
        {children}
        <button
          // className="cancelClass"
          onClick={toggleVisible}
        >
          cancel
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string,
  type: PropTypes.string
}

export default Togglable