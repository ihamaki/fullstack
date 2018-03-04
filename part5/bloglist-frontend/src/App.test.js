import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('app tests', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is shown', () => {
      app.update()
      expect(app.find('.loginForm').exists()).toEqual(true)
      expect(app.find('.blogForm').exists()).toEqual(false)
    })
  })

  describe('app tests when user logged in', () => {
    beforeEach(() => {
      const user = {
        username: 'ukkonooa',
        name: 'Ukko Nooa',
        token: '123123'
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('blog form is shown but login form is hidden', () => {
      app.update()

      expect(app.find('.loginForm').exists()).toEqual(false)
      expect(app.find('.blogForm').exists()).toEqual(true)
      expect(app.find('.blogList').exists()).toEqual(true)

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})