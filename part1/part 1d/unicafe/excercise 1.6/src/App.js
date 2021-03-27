import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (good) => () => {
    setGood(good)
  }

  const addNeutral = (neutral) => () => {
    setNeutral(neutral)
  }
  const addBad = (bad) => () => {
    setBad(bad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood(good + 1)}>good</button>
      <button onClick={addNeutral(neutral + 1)}>neutral</button>
      <button onClick={addBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}


export default App