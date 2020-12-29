require('dotenv').config()

const { env } = process
const dbNamespace = env.NODE_ENV === 'test' ? 'MONGODB_URL_TEST' : 'MONGODB_URL'
const { PORT, [dbNamespace]: MONGODB_URL } = env

module.exports = { PORT, MONGODB_URL }
