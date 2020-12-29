const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')

loginRouter.post('/', async ({ body }, res) => {
  const { username, password } = body

  const user = await User.findOne({ username })

  const isPasswordCorrect = !!user && await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'invalid username of password '})
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
