import axios from 'axios'

const baseUrl = '/api/blogs'

const composeAuthHeaders = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const getAll = async () => (await axios(baseUrl)).data

const create = async (blog, token) => (await axios.post(baseUrl, blog, composeAuthHeaders(token))).data

const update = async (blogId, data) => (await axios.put(`${baseUrl}/${blogId}`, data)).data

const remove = async (blogId, token) => await axios.delete(`${baseUrl}/${blogId}`, composeAuthHeaders(token))

export default { getAll, create, update, remove }
