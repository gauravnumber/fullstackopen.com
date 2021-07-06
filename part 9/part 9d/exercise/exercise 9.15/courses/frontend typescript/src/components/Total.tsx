import React from 'react'
import { ContentTypes } from '../types'

const Total = (props: ContentTypes) => {
  // const sum = props.courseParts.reduce((a) => a )
  // console.log(`sum`, sum)
  let sum = 0

  props.courseParts.forEach(coursePart => {
    sum += coursePart.exerciseCount
  })

  return (
    <div>
        Number of exercises {sum}
    </div>
  )
}

export default Total
