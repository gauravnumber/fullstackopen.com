import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'
// import { useSelector } from 'react-redux'
// const user = useSelector(state => state.user)
// console.log('user', user)

let token = null

const setToken = newtoken => {
  token = `bearer ${newtoken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  // console.log(`config in getAll()`, config)
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const updateLike = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  console.log('response in updateLike()', response)
  return response.data
}

const removeBlog = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('delete in removeBlog()', response)
  return response.data
}

const viewSingleBlog = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const viewComment = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  console.log('config', config)

  const response = await axios.get(`${baseUrl}/${id}/comment`, config)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  updateLike,
  removeBlog,
  viewSingleBlog,
  viewComment,
}