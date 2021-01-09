import axios from 'axios'

const baseURL = 'https://restcountries.eu/rest/v2/name'

const params = { fullText: true }

export const fetchCountries = async ({ query }) => (await axios(`${baseURL}/${query}`, { params })).data
