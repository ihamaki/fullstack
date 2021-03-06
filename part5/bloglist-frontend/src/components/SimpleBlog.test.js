import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('simpleblog tests', () => {
  it('renders blog title, author and likes', () => {
    const blog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 4
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const blogInfoDiv = blogComponent.find('.blogInfo')
    const blogLikesDiv = blogComponent.find('.blogLikes')

    expect(blogInfoDiv.text()).toContain(blog.title)
    expect(blogInfoDiv.text()).toContain(blog.author)
    expect(blogLikesDiv.text()).toContain('blog has', blog.likes, 'likes')
  })

  it('clicking like button twice calls event handler twice', () => {
    const blog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 4
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})