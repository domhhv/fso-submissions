import axios from 'axios'

const baseUrl = '/api/login'

const logIn = async creds => (await axios.post(baseUrl, creds)).data

export default { logIn }
