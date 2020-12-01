import axios from 'axios'

const baseUrl = '/api/blogs'

const composeAuthHeaders = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const getAll = async () => (await axios(baseUrl)).data

const create = async (blog, token) => (await axios.post(baseUrl, blog, composeAuthHeaders(token))).data

export default { getAll, create }
