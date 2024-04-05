import React from 'react'

const Button = (props) => {

  return (
    <button className={props.class} role="button" 
    onClick={() => console.log("redirect")}>
        {props.name}
    </button>
  )
}

export default Button