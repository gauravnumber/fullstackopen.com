import React from 'react'
// import Course from './components/Course'

const Course = ({ course }) => {
  let id = course.parts.map(v => v.id)

  return (
    <div>
      <h1>
        {course.name}
      </h1>
      <Header 
        key={id} 
        parts={course.parts} 
      />
    </div>
  )
}

const Header = (props) => {
  let part = props.parts.map(part => <p>{part.name} {part.exercises}</p>)

  return (
    <div>
      {part}
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
      // key={course.parts.}
      course={course} 
    />
  )
}

export default App