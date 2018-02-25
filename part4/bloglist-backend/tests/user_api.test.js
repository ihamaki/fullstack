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

  test('posting new user fails with proper statuscode and message if username is already taken', async () => {
    const usersBefore = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superroot',
      adult: false,
      password: 'supersalainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('posting new user fails with proper message if password is too short', async () => {
    const usersBefore = await usersInDb()

    const newUser = {
      username: 'uusiukko',
      name: 'Ukko Mooa',
      adult: false,
      password: 'lol'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must be at least 3 characters' })

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('posting new user without age info sets adult to true', async () => {
    const newUser = {
      username: 'muusikko',
      name: 'Musa',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = await usersInDb()
    const userAdult = users[users.length - 1].adult
    expect(userAdult).toBe(true)
  })
})

afterAll(() => {
  server.close()
})