import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationAddNew, notificationRemove } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.notificationAddNew(content)
    setTimeout(() => {
      this.props.notificationRemove()
    }, 5000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedAnecdoteForm = connect(
  null,
  { anecdoteCreation, notificationAddNew, notificationRemove }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
