import axios from 'axios'

const BASE_URL = '/api/persons'

const resolveData = ({ data }) => data

const fetchAll = () => axios(BASE_URL).then(resolveData)

const create = (name, number) => axios.post(BASE_URL, { name, number }).then(resolveData)

const update = (id, data) => axios.put(`${BASE_URL}/${id}`, data).then(resolveData)

const remove = id => axios.delete(`${BASE_URL}/${id}`)

export {
  fetchAll,
  create,
  update,
  remove,
}
