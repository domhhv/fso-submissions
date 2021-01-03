import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => (await axios(baseURL)).data

export const createOne = async body => (await axios.post(baseURL, body)).data

export const updateOne = async body => (await axios.put(`${baseURL}/${body.id}`, body)).data
