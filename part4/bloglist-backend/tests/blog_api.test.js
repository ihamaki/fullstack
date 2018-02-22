const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = testBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(testBlogs.length)
})

test('specific blog is in the returned list of blogs', async () => {
  const response = await api
    .get('/api/blogs')

  const blogTitles = response.body.map(blog => blog.title)
  expect(blogTitles).toContainEqual('React patterns')
})

test('valid blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const blogTitles = response.body.map(blog => blog.title)
  expect(blogTitles).toContainEqual('Canonical string reduction')
})

test('blog without title or url cannot be added', async () => {
  const noTitleBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  const noUrlBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  const testBlogs = await api
    .get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)

  const response = await api
    .get('/api/blogs')

  expect(response.body.length).toBe(testBlogs.body.length)
})

test('likes are set to 0 if blog is added without any likes', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const blogLikes = response.body.map(blog => blog.likes)
  expect(blogLikes[blogLikes.length - 1]).toBe(0)
})

afterAll(() => {
  server.close()
})