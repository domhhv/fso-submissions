const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', ({ body }, res) => {
  const blog = new Blog(body)

  blog
    .save()
    .then(data => res.status(201).json(data))
})

module.exports = blogsRouter
