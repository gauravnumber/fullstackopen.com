import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average()}</p>
      <p>positive {positive()} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

  const addGood = (good) => () => {
    setGood(good)
  }

  const addNeutral = (neutral) => () => {
    setNeutral(neutral)
  }
  const addBad = (bad) => () => {
    setBad(bad)
  }

  const average = () => {
    let average = (good - bad) / all
    if (average) {
      return average
    }
  }

  const positive = () => {
    let positive = good / all
    if (positive) {
      return positive * 100

    }
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood(good + 1)}>good</button>
      <button onClick={addNeutral(neutral + 1)}>neutral</button>
      <button onClick={addBad(bad + 1)}>bad</button>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all}  
        average={average}
        positive={positive}
      />

    </div>
  )
}


export default App
