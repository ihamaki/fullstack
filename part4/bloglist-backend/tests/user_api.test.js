const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

describe.only('when users exist in database', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', name: 'Rootti', password: 'sekret' })
    await user.save()
  })

  test('posting succeeds with a new username', async () => {
    const usersBefore = await usersInDb()

    const newUser = {
      username: 'ukkis',
      name: 'Ukko Nooa',
      adult: true,
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  server.close()
})