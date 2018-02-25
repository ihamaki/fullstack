const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { testBlogs, blogsInDb } = require('./test_helper')

describe('when some blogs are already saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = testBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json', async () => {
    const savedBlogs = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(savedBlogs.length)

    const returnedBlogTitles = response.body.map(blog => blog.title)
    savedBlogs.forEach(blog => {
      expect(returnedBlogTitles).toContain(blog.title)
    })
  })

  test('specific blog is in the returned list of blogs', async () => {
    const savedBlogs = await blogsInDb()
    const firstBlog = savedBlogs[0]
    console.log(firstBlog.id)

    const response = await api
      .get(`/api/blogs/${firstBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(firstBlog.title)
  })

  describe('adding a new blog', async () => {
    test('valid blog can be added', async () => {
      const existingBlogs = await blogsInDb()

      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterAddition = await blogsInDb()

      expect(blogsAfterAddition.length).toBe(existingBlogs.length + 1)
    })

    test('blog without title or url cannot be added, fails with status 400', async () => {
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

      const existingBlogs = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)

      const blogsAfterAddition = await blogsInDb()

      expect(blogsAfterAddition.length).toBe(existingBlogs.length)
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

      const blogs = await blogsInDb()
      const blogLikes = blogs.map(blog => blog.likes)
      expect(blogLikes[blogLikes.length - 1]).toBe(0)
    })
  })

  afterAll(() => {
    server.close()
  })
})
