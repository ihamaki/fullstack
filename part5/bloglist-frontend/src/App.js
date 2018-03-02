import React from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user: user })
    } catch (exception) {
      this.setState({ error: 'wrong username or password' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }

    blogService
      .create(blogObject)
      .then(blog => {
        this.setState({
          blogs: this.state.blogs.concat(blog),
          newTitle: '',
          newAuthor: '',
          newUrl: ''
        })
      })

  }

  render() {
    return (
      <div>
        <h1>Bloglist</h1>
        <Notification message={this.state.error} />

        {this.state.user === null ?
          <LoginForm
            state={this.state}
            handleLogin={this.login}
            handleFieldChange={this.handleFieldChange}
          /> :
          <div>
            <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
            <BlogForm
              state={this.state}
              onSubmit={this.addBlog}
              onBlogFormChange={this.handleFieldChange}
            />
            <BlogList blogs={this.state.blogs} />
          </div>
        }
      </div>
    )
  }
}

export default App
