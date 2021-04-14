import React from 'react'

const Sum = (props) => {
    let sum = props.exercises.reduce((a, b) => a + b)
    return (
        <strong>
            total of {sum} exercises
        </strong>
    )
}


export default Sum