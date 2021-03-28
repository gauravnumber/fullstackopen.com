import React, { useState } from 'react'

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )

}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (!good && !neutral && !bad) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average()} />
          <Statistic text="positive" value={positive()} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
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
    if (average || average === 0) {
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
      <Button handleClick={addGood(good + 1)} text="good" />
      <Button handleClick={addNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={addBad(bad + 1)} text="bad" />

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
