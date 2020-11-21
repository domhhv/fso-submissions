const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const data = await Blog.find({})
  res.json(data)
})

blogsRouter.post('/', async ({ body }, res) => {
  const blog = new Blog(body)

  const data = await blog.save()

  res.status(201).json(data)
})

blogsRouter.put('/:id', async ({ body, params }, res) => {
  const data = await Blog.findByIdAndUpdate(params.id, body, { new: true })

  res.json(data)
})

blogsRouter.delete('/:id', async ({ params }, res) => {
  await Blog.findByIdAndRemove(params.id)

  res.status(204).end()
})

module.exports = blogsRouter
