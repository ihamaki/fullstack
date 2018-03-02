import React from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      info: null,
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
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user: user, info: 'logged in succesfully!' })
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
          newUrl: '',
          info: 'new blog ' + blogObject.title + ' was succesfully added'
        })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
        this.blogForm.toggleVisibility()
      })
      .catch(error => {
        console.log(error)
        this.setState({ error: 'title or url missing' })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }

  render() {
    const loginForm = () => (
      <Togglable buttonLabel='login to bloglist'>
        <LoginForm
          state={this.state}
          handleLogin={this.login}
          handleFieldChange={this.handleFieldChange}
        />
      </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel='add a new blog' ref={component => this.blogForm = component}>
        <div>
          <BlogForm
            state={this.state}
            onSubmit={this.addBlog}
            onBlogFormChange={this.handleFieldChange}
          />
        </div>
      </Togglable>
    )

    return (
      <div>
        <h1>Bloglist</h1>
        <Notification message={this.state.error} className='error' />
        <Notification message={this.state.info} className='success' />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in <br/>
            <button onClick={this.logout}>logout</button></p>
            {blogForm()}
            <BlogList blogs={this.state.blogs} />
          </div>
        }
      </div>
    )
  }
}

export default App
