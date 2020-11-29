const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { MONGODB_URL } = require('./utils/config')
const logger = require('./utils/logger')

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info('Connected to MongoDB'))
  .catch(({ message }) => logger.error(`Error connecting to MongoDB: ${message}`))

const app = express()

app.use(cors())
app.use(express.json())

app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
