const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const blogsRouter = require('./controllers/blog')
const { MONGODB_URL } = require('./utils/config')

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
