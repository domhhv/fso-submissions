const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = []

let authHeader = ''

beforeAll(async () => {
  await User.deleteMany({})
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const requests = initialBlogs.map(blog => {
    let blogObject = new Blog(blog)
    return blogObject.save()
  })

  return Promise.all(requests)
})

describe('user creation', () => {
  test('succeeds with valid data', async () => {
    const username = 'dgrishajev'
    const name = 'Dominic Grishajev'
    const password = 'mycoolpassword'

    const user = { username, name, password }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterCreation = await User.find({})

    expect(usersAfterCreation).toHaveLength(initialUsers.length + 1)
    expect(usersAfterCreation[usersAfterCreation.length - 1].username).toEqual(username)
    expect(usersAfterCreation[usersAfterCreation.length - 1].name).toEqual(name)

    const loginResponse = await api
      .post('/api/login')
      .send({ username, password })

    authHeader = `Bearer ${loginResponse.body.token}`
    initialUsers.push(user)
  })

  test('requires username', async () => {
    const user = {
      username: '',
      password: 'mycoolpassword',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toEqual("User validation failed: username: Path `username` is required.")

    const usersAfterCreation = await User.find({})

    expect(usersAfterCreation).toHaveLength(initialUsers.length)
  })

  test('requires password', async () => {
    const user = {
      username: 'dgrishajev',
      password: '',
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toEqual("Password is required and must be at least 3 characters long")

    const usersAfterCreation = await User.find({})

    expect(usersAfterCreation).toHaveLength(initialUsers.length)
  })
})

describe('blogs fetching', () => {
  test('returns items as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
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
    const { id } = jwt.verify(authHeader.substring(7), process.env.SECRET)
    const title = 'Sample title'

    const blog = {
      title,
      author: 'Donald Duck',
      url: 'http://hello-world.com',
      likes: 21,
      user: id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
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
      .set('Authorization', authHeader)
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
      .set('Authorization', authHeader)
      .send(blog)
      .expect(400)

    const blogsAfterCreation = await Blog.find({})

    expect(blogsAfterCreation).toHaveLength(initialBlogs.length)
  })

  test('requires authentication', async () => {
    const blog = {
      title: 'Any blog',
      url: 'http://any-blog.com',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)

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
    blogToDelete.user = jwt.verify(authHeader.substring(7), process.env.SECRET).id
    await blogToDelete.save()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', authHeader)
      .send()
      .expect(204)

    const blogsAfterDeletion = await Blog.find({})

    expect(blogsAfterDeletion).toHaveLength(initialBlogs.length - 1)
    expect(blogsAfterDeletion[0].id).not.toEqual(blogToDelete.id)
  })
})

afterAll(() => mongoose.connection.close())
