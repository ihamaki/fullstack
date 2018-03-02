import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blog: props.blog,
      showFullInfo: false
    }
  }

  toggleVisibility = () => {
    this.setState({ showFullInfo: !this.state.showFullInfo })
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
            <div>{blog.likes} likes <button>like</button></div>
            <div>added by someone</div>
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