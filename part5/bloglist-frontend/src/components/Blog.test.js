import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('blog tests', () => {
  let blog
  let blogComponent

  beforeEach(() => {
    blog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 4
    }

    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()
    blogComponent = shallow(
      <Blog
        blog={blog}
        onBlogLike={mockLikeHandler}
        onBlogDelete={mockDeleteHandler}
      />
    )
  })

  it('by default only blog title and author are shown', () => {
    const blogInfoDiv = blogComponent.find('.minimalInfo')
    expect(blogInfoDiv.text()).toEqual(blog.title + ' ' + blog.author)
  })

  it('after clicking blog title the full info is shown', () => {
    const blogInfoDiv = blogComponent.find('.minimalInfo')
    blogInfoDiv.simulate('click')

    const blogFullInfoDiv = blogComponent.find('.fullInfo')
    expect(blogFullInfoDiv.text()).toContain(blog.title)
    expect(blogFullInfoDiv.text()).toContain(blog.author)
    expect(blogFullInfoDiv.text()).toContain(blog.url)
    expect(blogFullInfoDiv.text()).toContain(blog.likes + " likes")
  })
})