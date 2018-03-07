import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationVote, notificationRemove } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => {
    this.props.anecdoteVoting(anecdote.id)
    this.props.notificationVote(anecdote.content)
    setTimeout(() => {
      this.props.notificationRemove()
    }, 5000)
  }

  render() {
    const filter = this.props.filter
    const anecdotes = this.props.anecdotes.filter(a => a.content.trim().toLowerCase().match(filter))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVoting, notificationVote, notificationRemove }
)(AnecdoteList)

export default ConnectedAnecdoteList
