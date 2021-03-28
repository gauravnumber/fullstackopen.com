import React, { useState } from 'react'

const Vote = (props) => {
  return (
    <p>
      has {props.vote}
    </p>
  )
}

const MostVote = (props) => {
  let most = 0
  let mostIndex = 0
  props.vote.forEach((x, i) => {
    if (most < props.vote[i]) {
      most = props.vote[i]
      mostIndex = i
    }
  })
  
  return (
    <div>
      <h1>
        Anecdote with most votes
      </h1>
      <p>
        {props.anecdotes[mostIndex]}
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [i, setI] = useState(0)
  const [vote, setVote] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  
  const random = () => {
    let t = Math.floor((Math.random() * (anecdotes.length)))
    setI(t)
    setSelected(t)
  }


  const voted = () => {
    let copy = [...vote]
    copy[i]++
    setVote(copy)
  }

  const votes = () => {
    return vote[i]
  }

  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <Vote vote={votes()} />
      <button onClick={voted}>vote</button>
      <button onClick={random}>next anecdotes</button>
      <MostVote 
        vote={vote} 
        anecdotes={anecdotes}
      />
    </div>
  )
}

export default App