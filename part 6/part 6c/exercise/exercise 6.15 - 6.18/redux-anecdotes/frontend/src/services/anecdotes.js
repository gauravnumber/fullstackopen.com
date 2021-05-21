import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0}
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addVote = async id => {
  let newContent = await axios.get(`${baseUrl}/${id}`)
  // newContent = {...newContent, votes: newContent.votes + 1}
  newContent.data.votes++
  
  // console.log('newContent.data', newContent.data)
  const response = await axios.put(`${baseUrl}/${id}`, newContent.data)
  return response.data
}

const anecdotes = { 
  getAll, 
  createAnecdote,
  addVote
}

export default anecdotes