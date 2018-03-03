import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    onBlogLike: PropTypes.func.isRequired,
    onBlogDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      user: props.user,
      showFullInfo: false
    }
  }

  toggleVisibility = () => {
    this.setState({ showFullInfo: !this.state.showFullInfo })
  }

  updateLikes = (event) => {
    event.preventDefault()
    const blog = this.state.blog
    this.props.onBlogLike(blog.id)
    this.setState({ blog: { ...blog, likes: blog.likes + 1 } })
  }

  destroyBlog = (event) => {
    event.preventDefault()
    const blog = this.state.blog
    this.props.onBlogDelete(blog.id)
  }

  render() {
    const blog = this.state.blog
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        {this.state.showFullInfo ?
          <div>
            <div onClick={this.toggleVisibility}>{blog.title}</div>
            <div>written by {blog.author}</div>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
              {blog.likes} likes
              <button onClick={this.updateLikes}>like</button>
            </div>
            <div>added by {this.state.user.name}</div>
            {!blog.user || this.state.user.username === blog.user.username ?
              <div><button onClick={this.destroyBlog}>delete</button></div> :
              null
            }
          </div> :
          <div onClick={this.toggleVisibility}>
            {blog.title} {blog.author}
          </div>
        }
      </div>
    )
  }
}

export default Blog