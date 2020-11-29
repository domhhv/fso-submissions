const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => res.json(
  await Blog.find({}).populate('user', { name: 1, username: 1 })
))

blogsRouter.post('/', async ({ body, token }, res) => {
  const { id } = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(id)
  const blog = new Blog({ ...body, user: user._id })

  const data = await blog.save()
  user.blogs = [...user.blogs, data._id]
  await user.save()

  res.status(201).json(data)
})

blogsRouter.put('/:id', async ({ body, params }, res) => {
  const data = await Blog.findByIdAndUpdate(params.id, body, { new: true })

  res.json(data)
})

blogsRouter.delete('/:id', async ({ token, params }, res) => {
  const blog = await Blog.findById(params.id)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (blog.user.toString() === decodedToken.id.toString()) {
    await blog.remove()
    res.status(204).end()
  }

  const unauthorizedError = new Error('Mismatched tokens')
  unauthorizedError.name = 'UnauthorizedError'
  throw unauthorizedError
})

module.exports = blogsRouter
