import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
	// return token
}

const getAll = () => {
	const config = {
		headers: { Authorization: token}
	}

	const request = axios.get(baseUrl, config)
	return request.then(response => response.data)
}

// const create = async newObject => {
// 	const config = {
// 		headers: { Authorization: token}
// 	}

// 	const response = await axios.post(baseUrl, newObject, config)
// 	return response.data
// }

const create = (newObject) => {
	const config = {
		headers: {
			Authorization: token
		}
	}

	const request = axios.post(baseUrl, newObject, config)
	return request.then(response => response.data)
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request.then(response => response.data)
}

export default { getAll, create, update, setToken }