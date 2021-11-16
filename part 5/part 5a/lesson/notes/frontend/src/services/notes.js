import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
	return token
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject)

	console.log('newObject', newObject)
	console.log('request', request)

	return request.then(response => {
		console.log('response', response)

		return response.data
	})
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default { getAll, create, update, setToken }