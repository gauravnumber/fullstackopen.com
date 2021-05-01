import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null

const setToken = newtoken => {
  token = `bearer ${newtoken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const config = {
    headers: { Authorization: token}
  }

  // console.log(`config in getAll()`, config)
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}


export default { getAll, create, setToken }