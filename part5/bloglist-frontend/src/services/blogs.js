import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (id, updatedBlogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlogObject)
  return response.data
}

const destroy = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, destroy, setToken }