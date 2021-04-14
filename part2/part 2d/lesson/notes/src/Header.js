import React from 'react'

const Header = (props) => {
    console.log("Header", props);
  
    return (
      <h1>{props.header}</h1>
    )
  }

export default Header