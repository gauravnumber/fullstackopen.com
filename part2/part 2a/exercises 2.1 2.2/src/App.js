import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Content = (props) => {
  let part = props.parts.map(part => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ))

  return (
    <div>
      {part}
      <Sum exercises={props.parts.map(part => part.exercises)} />
    </div>

  )
}

const Sum = (props) => {
  let sum = props.exercises.reduce((a, b) => a + b)
  return (
    <strong>
      total of {sum} exercises
    </strong>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content 
        parts={props.course.parts} 
      />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11, 
        id: 4
      }
    ]
  }

  return (
    <Course 
      course={course} 
    />
  )
}

export default App