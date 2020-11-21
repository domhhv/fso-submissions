const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Blog title',
    author: 'Me',
    url: 'http://some-url.com',
    likes: 42,
  },
  {
    title: 'Blog title 2',
    author: 'Me too',
    url: 'http://some-url-two.com',
    likes: 42,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const requests = initialBlogs.map(blog => {
    let blogObject = new Blog(blog)
    return blogObject.save()
  })

  return Promise.all(requests)
})

describe('blogs fetching', () => {
  test('returns items as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct amount of items', async () => {
    const blogs = await Blog.find({})
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.length)
  })

  test('returns items with id field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('blog creation', () => {
  test('succeeds with valid data', async () => {
    const title = 'Sample title'

    const blog = {
      title,
      author: 'Donald Duck',
      url: 'http://hello-world.com',
      likes: 21,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterCreation = await Blog.find({})

    expect(blogsAfterCreation).toHaveLength(initialBlogs.length + 1)
    expect(blogsAfterCreation[blogsAfterCreation.length - 1].title).toEqual(title)
  })

  test('defaults likes property value to 0', async () => {
    const blog = {
      title: 'Another sample title',
      author: 'Eva Eagle',
      url: 'http://hello-world.com',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterCreation = await Blog.find({})

    expect(blogsAfterCreation[blogsAfterCreation.length - 1].likes).toEqual(0)
  })

  test('requires title and url', async () => {
    const blog = {
      author: 'Unknown Person',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(500)

    const blogsAfterCreation = await Blog.find({})

    expect(blogsAfterCreation).toHaveLength(initialBlogs.length)
  })
})

describe('blog update', () => {
  test('succeeds with valid data', async () => {
    const title = 'New title'
    const url = 'http://new-fancy-url.com'
    const likes = 42
    const updateData = { title, url, likes }
    const [blogToUpdate] = await Blog.find({})

    await api
      .put(`/api/blogs/${blogToUpdate._id}`, updateData)
      .send(updateData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const [blogAfterUpdate] = await Blog.find({})

    expect(blogAfterUpdate.title).toEqual(title)
    expect(blogAfterUpdate.likes).toEqual(likes)
    expect(blogAfterUpdate.url).toEqual(url)
  })
})

describe('blog deletion', () => {
  test('succeeds with valid id', async () => {
    const [blogToDelete] = await Blog.find({})

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDeletion = await Blog.find({})

    expect(blogsAfterDeletion).toHaveLength(initialBlogs.length - 1)
    expect(blogsAfterDeletion[0].id).not.toEqual(blogToDelete.id)
  })
})

afterAll(() => mongoose.connection.close())
