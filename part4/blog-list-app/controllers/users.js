const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

usersRouter.get('/', async (req, res) => res.json(
  await User.find({}).populate('blog', { url: 1, title: 1, author: 1 })
))

usersRouter.post('/', async ({ body }, res) => {
  const { name, username, password } = body

  if (password.length < 3) {
    const error = new Error('Password must be at least 3 characters long')
    error.name = 'ValidationError'
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({ name, username, passwordHash })

  const data = await user.save()

  res.status(201).json(data)
})

module.exports = usersRouter
